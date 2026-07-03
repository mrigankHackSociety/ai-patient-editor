import type { Level } from "@tiptap/extension-heading";

export type PatentInstruction = "clarity" | "expand" | "formal";
export type SuggestionActionId = "approve" | "reject";
export type FormattingCommand = "heading" | "bold" | "italic" | "code";

export interface MenuItem {
  id: string;
  label: string;
  type: "formatting" | "ai" | "action";
  command?: FormattingCommand;
  level?: Level;
  instruction?: PatentInstruction;
  actionId?: SuggestionActionId;
}

export interface MenuConfig {
  floating: MenuItem[];
  bubble: {
    default: MenuItem[];
    suggestion: MenuItem[];
  };
}

export const menuConfig: MenuConfig = {
  floating: [
    { id: "h1", label: "H1", type: "formatting", command: "heading", level: 1 },
    { id: "h2", label: "H2", type: "formatting", command: "heading", level: 2 },
  ],
  bubble: {
    default: [
      { id: "clarity", label: "Clarity", type: "ai", instruction: "clarity" },
      { id: "expand", label: "Expand", type: "ai", instruction: "expand" },
      { id: "formal", label: "Formal", type: "ai", instruction: "formal" },
      { id: "bold", label: "Bold", type: "formatting", command: "bold" },
      { id: "italic", label: "Italic", type: "formatting", command: "italic" },
      { id: "code", label: "Code", type: "formatting", command: "code" },
    ],
    suggestion: [
      { id: "approve", label: "Approve", type: "action", actionId: "approve" },
      { id: "reject", label: "Reject", type: "action", actionId: "reject" },
    ],
  },
};
