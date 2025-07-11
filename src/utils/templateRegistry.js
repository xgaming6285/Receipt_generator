// Lazy load templates using dynamic imports
const templateLoaders = {
  1: () => import("../components/templates/Template1"),
  2: () => import("../components/templates/Template2"),
  3: () => import("../components/templates/Template3"),
  4: () => import("../components/templates/Template4"),
  5: () => import("../components/templates/Template5"),
  6: () => import("../components/templates/Template6"),
  7: () => import("../components/templates/Template7"),
  8: () => import("../components/templates/Template8"),
  9: () => import("../components/templates/Template9"),
};

export const templates = [
  { name: "Template 1", id: 1 },
  { name: "Template 2", id: 2 },
  { name: "Template 3", id: 3 },
  { name: "Template 4", id: 4 },
  { name: "Template 5", id: 5 },
  { name: "Template 6", id: 6 },
  { name: "Template 7", id: 7 },
  { name: "Template 8", id: 8 },
  { name: "Template 9", id: 9 },
];

export const getTemplate = async (templateNumber) => {
  const loader = templateLoaders[templateNumber] || templateLoaders[1];
  const module = await loader();
  return module.default;
};
