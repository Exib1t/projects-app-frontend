export const enum IconTypes {
  account = 'account',
  preferences = 'preferences',
  edit = 'edit',
  logout = 'logout',
  other = 'other',
  sortUp = 'sort-up',
  sortDown = 'sort-down',
  task = 'task',
  bug = 'bug',
  editPencil = 'edit-pencil',
  priorityLow = 'priority-low',
  priorityMedium = 'priority-medium',
  priorityHigh = 'priority-high',
  back = 'back',
}

export const projectColors = [
  '#f44336',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b',
  '#b9c6cc',
  '#ffffff',
  '#000000',
];

export const quillToolbarOptions = [
  [{ font: [] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: [] }],
  [{ color: [] }, { background: [] }],
  ['image'],
  ['clean'],
];
export const quillModules = {
  toolbar: quillToolbarOptions,
};
