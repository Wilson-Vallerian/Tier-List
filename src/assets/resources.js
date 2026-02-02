import { selectItems } from "../selectors/selectors";

export const tierLabels = [
  { title: "S", bgColor: "purple" },
  { title: "A", bgColor: "red" },
  { title: "B", bgColor: "orange" },
  { title: "C", bgColor: "green" },
  { title: "D", bgColor: "blue" },
  { title: "E", bgColor: "grey" },
];

export const defaultDropZones = [
  { id: "S", dragables: [] },
  { id: "A", dragables: [] },
  { id: "B", dragables: [] },
  { id: "C", dragables: [] },
  { id: "D", dragables: [] },
  { id: "E", dragables: [] },
  { id: "F", dragables: [] },
  { id: "G", dragables: [] },
  { id: "H", dragables: [] },
  { id: "I", dragables: [] },
  { id: "free", dragables: selectItems.map((item) => item.id) },
];

export const dropzoneIds = defaultDropZones.map((dz) => dz.id);
