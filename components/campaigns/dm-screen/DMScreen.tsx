"use client";

import { DiceRoller } from "./DiceRoller";
import { InitiativeTracker } from "./InitiativeTracker";
import { DMTools } from "./DMTools";

export function DMScreen() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[calc(100vh-240px)] min-h-[500px]">
            {/* Left Column: Initiative & Dice */}
            <div className="md:col-span-4 flex flex-col gap-6 h-full">
                <div className="flex-1 min-h-0">
                    <InitiativeTracker />
                </div>
                <div className="h-[340px] shrink-0">
                    <DiceRoller />
                </div>
            </div>

            {/* Right Column: DM Tools */}
            <div className="md:col-span-8 h-full min-h-0">
                <DMTools />
            </div>
        </div>
    );
}
