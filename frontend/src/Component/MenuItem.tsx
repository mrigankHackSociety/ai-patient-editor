import { Editor } from "@tiptap/react";
import type {
  MenuItem as IMenuItem,
  FormattingCommand,
  PatentInstruction,
  SuggestionActionId,
} from "./menuConfig";

interface MenuItemProps {
  item: IMenuItem;
  editor: Editor | null;
  onAiAction?: (instruction: PatentInstruction) => void;
  onAction?: (actionId: SuggestionActionId) => void;
}

const MenuItem = ({
  item,
  editor,
  onAiAction,
  onAction,
}: MenuItemProps) => {
  const handleClick = () => {
    if (item.type === "ai" && item.instruction && onAiAction) {
      onAiAction(item.instruction);
    } else if (item.type === "action" && item.actionId && onAction) {
      onAction(item.actionId);
    } else if (item.type === "formatting" && editor && item.command) {
      formattingCommands[item.command].execute(editor, item);
    }
  };

  const isActive =
    editor && item.command
      ? formattingCommands[item.command].isActive(editor, item)
      : false;

  return (
    <button onClick={handleClick} className={isActive ? "is-active" : ""}>
      {item.label}
    </button>
  );
};

const formattingCommands: Record<
  FormattingCommand,
  {
    execute: (editor: Editor, item: IMenuItem) => void;
    isActive: (editor: Editor, item: IMenuItem) => boolean;
  }
> = {
  heading: {
    execute: (editor, item) => {
      if (item.level) {
        editor.chain().focus().toggleHeading({ level: item.level }).run();
      }
    },
    isActive: (editor, item) => editor.isActive("heading", { level: item.level }),
  },
  bold: {
    execute: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  italic: {
    execute: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  code: {
    execute: (editor) => editor.chain().focus().toggleCode().run(),
    isActive: (editor) => editor.isActive("code"),
  },
};

export default MenuItem;
