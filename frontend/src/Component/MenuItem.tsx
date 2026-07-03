import { Editor } from "@tiptap/react";
import type { MenuItem as IMenuItem } from "./menuConfig";

interface MenuItemProps {
  item: IMenuItem;
  editor: Editor | null;
  onAiAction?: (instruction: string) => void;
  onAction?: (actionId: string) => void;
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
    } else if (item.type === "action" && onAction) {
      onAction(item.id);
    } else if (item.type === "formatting" && editor && item.command) {
      executeFormattingCommand(editor, item);
    }
  };

  const isActive = getIsActive(editor, item);

  return (
    <button onClick={handleClick} className={isActive ? "is-active" : ""}>
      {item.label}
    </button>
  );
};

function executeFormattingCommand(editor: Editor, item: IMenuItem) {
  switch (item.command) {
    case "heading":
      editor.chain().focus().toggleHeading({ level: item.level }).run();
      break;
    case "bold":
      editor.chain().focus().toggleBold().run();
      break;
    case "italic":
      editor.chain().focus().toggleItalic().run();
      break;
    case "code":
      editor.chain().focus().toggleCode().run();
      break;
  }
}

function getIsActive(editor: Editor | null, item: IMenuItem): boolean {
  if (!editor) return false;

  switch (item.command) {
    case "heading":
      return editor.isActive("heading", { level: item.level });
    case "bold":
      return editor.isActive("bold");
    case "italic":
      return editor.isActive("italic");
    case "code":
      return editor.isActive("code");
    default:
      return false;
  }
}

export default MenuItem;
