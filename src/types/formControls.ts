export interface IControls {
  name: string;
  label: string;
  placeholder: string;
  componentType: "input" | "select" | "textarea";
  type?: string;
  options?: { id: string; label: string }[];
}
