import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useCampaigns, Campaign } from "@/contexts/CampaignContext";
import { ChevronRight, ChevronLeft, Save } from "lucide-react";

interface CreateCampaignModalProps {
    isOpen: boolean;
    onClose: () => void;
    campaignToEdit?: Campaign | null;
}

type CampaignFormData = Omit<Campaign, "id" | "createdAt" | "status">;

const INITIAL_DATA: CampaignFormData = {
    title: "",
    synopsis: "",
    spiritualTheme: "",
    vigil: "Vigília do Véu",
    focus: "Restoration",
    corruptionRoots: { primary: "", secondary: "" },
    locations: {
        city: { name: "", sin: "", virtue: "", description: "" },
        sanctuary: { name: "", status: "Sagrado", hope: "", description: "" },
        rift: { location: "", intensity: "Média", desire: "", description: "" },
    },
    catalysts: [
        { name: "", type: "Sagrado", purpose: "" },
        { name: "", type: "Cinzento", purpose: "" },
    ],
    npcs: {
        ally: { name: "", virtue: "", sin: "" },
        opponent: { name: "", root: "", goal: "" },
        neutral: { name: "", secret: "", risk: "" },
    },
    initialArc: {
        whisper: "",
        signal: "",
        corruption: "",
        choice: "",
        judgment: "",
    },
};

export function CreateCampaignModal({ isOpen, onClose, campaignToEdit }: CreateCampaignModalProps) {
    const { addCampaign, updateCampaign } = useCampaigns();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<CampaignFormData>(INITIAL_DATA);

    useEffect(() => {
        if (isOpen) {
            if (campaignToEdit) {
                setFormData({
                    ...INITIAL_DATA,
                    ...campaignToEdit,
                    corruptionRoots: { ...INITIAL_DATA.corruptionRoots, ...campaignToEdit.corruptionRoots },
                    locations: { ...INITIAL_DATA.locations, ...campaignToEdit.locations },
                    npcs: { ...INITIAL_DATA.npcs, ...campaignToEdit.npcs },
                    initialArc: { ...INITIAL_DATA.initialArc, ...campaignToEdit.initialArc },
                });
            } else {
                setFormData(INITIAL_DATA);
            }
            setStep(1);
        }
    }, [isOpen, campaignToEdit]);

    const updateField = (section: keyof CampaignFormData, field: string, value: any) => {
        setFormData((prev) => {
            if (typeof prev[section] === "object" && prev[section] !== null && !Array.isArray(prev[section])) {
                return {
                    ...prev,
                    [section]: {
                        ...prev[section] as any,
                        [field]: value,
                    },
                };
            }
            return { ...prev, [section]: value };
        });
    };

    const updateNestedField = (section: keyof CampaignFormData, subsection: string, field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section] as any,
                [subsection]: {
                    ...(prev[section] as any)[subsection],
                    [field]: value,
                },
            },
        }));
    };

    const updateCatalyst = (index: number, field: string, value: string) => {
        const newCatalysts = [...formData.catalysts];
        newCatalysts[index] = { ...newCatalysts[index], [field]: value };
        setFormData((prev) => ({ ...prev, catalysts: newCatalysts }));
    };

    const handleSubmit = () => {
        if (campaignToEdit) {
            updateCampaign(campaignToEdit.id, formData);
        } else {
            addCampaign(formData);
        }
        setFormData(INITIAL_DATA);
        setStep(1);
        onClose();
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] bg-background border-gold-500/20 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="font-cinzel text-2xl text-gold-500 flex justify-between items-center">
                        <span>{campaignToEdit ? "Editar Campanha" : "Nova Campanha"}</span>
                        <span className="text-sm font-sans text-muted-foreground">Passo {step} de 4</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4 space-y-6">
                    {/* STEP 1: A SEMENTE */}
                    {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-cinzel text-gold-400 border-b border-gold-500/20 pb-2">
                                1. A Semente Espiritual
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <Label>Nome da Campanha</Label>
                                    <Input
                                        value={formData.title}
                                        onChange={(e) => updateField("title", "", e.target.value)}
                                        placeholder="Ex: A Queda de Solitude"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Vigília</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.vigil}
                                        onChange={(e) => updateField("vigil", "", e.target.value)}
                                    >
                                        <option value="Vigília do Véu">Vigília do Véu (Atual)</option>
                                        <option value="Vigília do Fogo">Vigília do Fogo</option>
                                        <option value="Vigília da Cinza">Vigília da Cinza</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Foco</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.focus}
                                        onChange={(e) => updateField("focus", "", e.target.value)}
                                    >
                                        <option value="Restoration">Restauração</option>
                                        <option value="Resistance">Resistência</option>
                                        <option value="Revelation">Revelação</option>
                                    </select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label>Tema Espiritual</Label>
                                    <Input
                                        value={formData.spiritualTheme}
                                        onChange={(e) => updateField("spiritualTheme", "", e.target.value)}
                                        placeholder="Ex: Orgulho vs. Arrependimento"
                                    />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label>Sinopse</Label>
                                    <Textarea
                                        value={formData.synopsis}
                                        onChange={(e) => updateField("synopsis", "", e.target.value)}
                                        placeholder="Breve descrição do cenário..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: A SOMBRA E OS LOCAIS */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-cinzel text-gold-400 border-b border-gold-500/20 pb-2">
                                2. A Sombra e o Cenário
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Raiz Primária da Corrupção</Label>
                                    <Input
                                        value={formData.corruptionRoots.primary}
                                        onChange={(e) => updateField("corruptionRoots", "primary", e.target.value)}
                                        placeholder="Ex: Orgulho de Lethariel"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Raiz Secundária</Label>
                                    <Input
                                        value={formData.corruptionRoots.secondary}
                                        onChange={(e) => updateField("corruptionRoots", "secondary", e.target.value)}
                                        placeholder="Opcional"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                                <h4 className="font-medium text-gold-500">A Tríade de Locais</h4>

                                {/* City */}
                                <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded border border-gold-500/10">
                                    <div className="col-span-3 font-cinzel text-sm text-muted-foreground">A Cidade</div>
                                    <Input placeholder="Nome" value={formData.locations.city.name} onChange={(e) => updateNestedField("locations", "city", "name", e.target.value)} />
                                    <Input placeholder="Pecado Dominante" value={formData.locations.city.sin} onChange={(e) => updateNestedField("locations", "city", "sin", e.target.value)} />
                                    <Input placeholder="Virtude Rara" value={formData.locations.city.virtue} onChange={(e) => updateNestedField("locations", "city", "virtue", e.target.value)} />
                                    <Textarea
                                        className="col-span-3 mt-2"
                                        placeholder="Informações extras sobre a cidade..."
                                        value={formData.locations.city.description}
                                        onChange={(e) => updateNestedField("locations", "city", "description", e.target.value)}
                                    />
                                </div>

                                {/* Sanctuary */}
                                <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded border border-gold-500/10">
                                    <div className="col-span-3 font-cinzel text-sm text-muted-foreground">O Santuário</div>
                                    <Input placeholder="Nome" value={formData.locations.sanctuary.name} onChange={(e) => updateNestedField("locations", "sanctuary", "name", e.target.value)} />
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.locations.sanctuary.status}
                                        onChange={(e) => updateNestedField("locations", "sanctuary", "status", e.target.value)}
                                    >
                                        <option>Sagrado</option>
                                        <option>Profanado</option>
                                        <option>Abandonado</option>
                                    </select>
                                    <Input placeholder="Esperança Guardada" value={formData.locations.sanctuary.hope} onChange={(e) => updateNestedField("locations", "sanctuary", "hope", e.target.value)} />
                                    <Textarea
                                        className="col-span-3 mt-2"
                                        placeholder="Informações extras sobre o santuário..."
                                        value={formData.locations.sanctuary.description}
                                        onChange={(e) => updateNestedField("locations", "sanctuary", "description", e.target.value)}
                                    />
                                </div>

                                {/* Rift */}
                                <div className="grid grid-cols-3 gap-2 p-3 bg-black/20 rounded border border-gold-500/10">
                                    <div className="col-span-3 font-cinzel text-sm text-muted-foreground">A Fenda</div>
                                    <Input placeholder="Localização" value={formData.locations.rift.location} onChange={(e) => updateNestedField("locations", "rift", "location", e.target.value)} />
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        value={formData.locations.rift.intensity}
                                        onChange={(e) => updateNestedField("locations", "rift", "intensity", e.target.value)}
                                    >
                                        <option>Fraca</option>
                                        <option>Média</option>
                                        <option>Profunda</option>
                                    </select>
                                    <Input placeholder="O que ela deseja?" value={formData.locations.rift.desire} onChange={(e) => updateNestedField("locations", "rift", "desire", e.target.value)} />
                                    <Textarea
                                        className="col-span-3 mt-2"
                                        placeholder="Informações extras sobre a fenda..."
                                        value={formData.locations.rift.description}
                                        onChange={(e) => updateNestedField("locations", "rift", "description", e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ELEMENTOS NARRATIVOS */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-cinzel text-gold-400 border-b border-gold-500/20 pb-2">
                                3. Elementos Narrativos
                            </h3>

                            <div className="space-y-4">
                                <h4 className="font-medium text-gold-500">Objetos Catalisadores</h4>
                                {formData.catalysts.map((cat, idx) => (
                                    <div key={idx} className="grid grid-cols-3 gap-2">
                                        <Input placeholder="Nome do Objeto" value={cat.name} onChange={(e) => updateCatalyst(idx, "name", e.target.value)} />
                                        <select
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                            value={cat.type}
                                            onChange={(e) => updateCatalyst(idx, "type", e.target.value)}
                                        >
                                            <option>Sagrado</option>
                                            <option>Consagrado</option>
                                            <option>Cinzento</option>
                                            <option>Profano Leve</option>
                                        </select>
                                        <Input placeholder="Propósito Narrativo" value={cat.purpose} onChange={(e) => updateCatalyst(idx, "purpose", e.target.value)} />
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 border-t border-gold-500/10 pt-4">
                                <h4 className="font-medium text-gold-500">NPCs Fundamentais</h4>

                                <div className="p-3 bg-black/20 rounded border border-gold-500/10 space-y-2">
                                    <Label className="text-gold-400">Aliado (A Luz Imperfeita)</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input placeholder="Nome" value={formData.npcs.ally.name} onChange={(e) => updateNestedField("npcs", "ally", "name", e.target.value)} />
                                        <Input placeholder="Virtude" value={formData.npcs.ally.virtue} onChange={(e) => updateNestedField("npcs", "ally", "virtue", e.target.value)} />
                                        <Input placeholder="Pecado Latente" value={formData.npcs.ally.sin} onChange={(e) => updateNestedField("npcs", "ally", "sin", e.target.value)} />
                                    </div>
                                </div>

                                <div className="p-3 bg-black/20 rounded border border-gold-500/10 space-y-2">
                                    <Label className="text-red-400">Oponente (A Sombra Ativa)</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input placeholder="Nome" value={formData.npcs.opponent.name} onChange={(e) => updateNestedField("npcs", "opponent", "name", e.target.value)} />
                                        <Input placeholder="Raiz da Corrupção" value={formData.npcs.opponent.root} onChange={(e) => updateNestedField("npcs", "opponent", "root", e.target.value)} />
                                        <Input placeholder="Objetivo" value={formData.npcs.opponent.goal} onChange={(e) => updateNestedField("npcs", "opponent", "goal", e.target.value)} />
                                    </div>
                                </div>

                                <div className="p-3 bg-black/20 rounded border border-gold-500/10 space-y-2">
                                    <Label className="text-gray-400">Neutro (A Voz da Cinza)</Label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <Input placeholder="Nome" value={formData.npcs.neutral.name} onChange={(e) => updateNestedField("npcs", "neutral", "name", e.target.value)} />
                                        <Input placeholder="Segredo" value={formData.npcs.neutral.secret} onChange={(e) => updateNestedField("npcs", "neutral", "secret", e.target.value)} />
                                        <Input placeholder="Risco" value={formData.npcs.neutral.risk} onChange={(e) => updateNestedField("npcs", "neutral", "risk", e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: ARCO INICIAL */}
                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <h3 className="text-lg font-cinzel text-gold-400 border-b border-gold-500/20 pb-2">
                                4. O Arco Inicial (Sessões 1-5)
                            </h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>1. Sussurro (O chamado velado)</Label>
                                    <Input value={formData.initialArc.whisper} onChange={(e) => updateField("initialArc", "whisper", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>2. Sinal (A revelação simbólica)</Label>
                                    <Input value={formData.initialArc.signal} onChange={(e) => updateField("initialArc", "signal", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>3. Corrupção (A verdade se mostra)</Label>
                                    <Input value={formData.initialArc.corruption} onChange={(e) => updateField("initialArc", "corruption", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>4. Escolha (O dilema moral)</Label>
                                    <Input value={formData.initialArc.choice} onChange={(e) => updateField("initialArc", "choice", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label>5. Juízo Parcial (A consequência espiritual)</Label>
                                    <Input value={formData.initialArc.judgment} onChange={(e) => updateField("initialArc", "judgment", e.target.value)} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex justify-between sm:justify-between">
                    <Button
                        variant="ghost"
                        onClick={step === 1 ? onClose : prevStep}
                        className="text-muted-foreground"
                    >
                        {step === 1 ? "Cancelar" : <><ChevronLeft className="mr-2 h-4 w-4" /> Voltar</>}
                    </Button>

                    <div className="flex gap-2">
                        {step < 4 ? (
                            <Button onClick={nextStep} className="bg-gold-600 hover:bg-gold-700 text-black">
                                Próximo <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} className="bg-gold-600 hover:bg-gold-700 text-black">
                                <Save className="mr-2 h-4 w-4" /> {campaignToEdit ? "Salvar Alterações" : "Criar Campanha"}
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
