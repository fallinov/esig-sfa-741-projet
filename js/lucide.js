/**
 * Minimal Lucide subset (local, no CDN)
 * Includes only icons used in index.html and exposes lucide.createIcons().
 */
(function (global) {
  'use strict';

  const defaultAttributes = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 24,
    height: 24,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round'
  };

  const createSVGElement = ([tag, attrs, children]) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs || {}).forEach((name) => {
      element.setAttribute(name, String(attrs[name]));
    });
    if (children && children.length) {
      children.forEach((child) => element.appendChild(createSVGElement(child)));
    }
    return element;
  };

  const createElement = (iconNode, customAttrs = {}) => {
    const tag = 'svg';
    const attrs = { ...defaultAttributes, ...customAttrs };
    return createSVGElement([tag, attrs, iconNode]);
  };

  const getAttrs = (element) => Array.from(element.attributes).reduce((attrs, attr) => {
    attrs[attr.name] = attr.value;
    return attrs;
  }, {});

  const getClassNames = (attrs) => {
    if (typeof attrs === 'string') return attrs;
    if (!attrs || !attrs.class) return '';
    if (typeof attrs.class === 'string') return attrs.class.split(' ');
    if (Array.isArray(attrs.class)) return attrs.class;
    return '';
  };

  const combineClassNames = (arrayOfClassnames) => {
    const classNameArray = arrayOfClassnames.flatMap(getClassNames);
    return classNameArray
      .map((c) => (c || '').trim())
      .filter(Boolean)
      .filter((v, i, self) => self.indexOf(v) === i)
      .join(' ');
  };

  const toPascalCase = (str) => str.replace(/(\w)(\w*)(_|-|\s*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase());

  const replaceElement = (element, { nameAttr, icons, attrs }) => {
    const iconNameKebab = element.getAttribute(nameAttr);
    if (iconNameKebab == null) return;
    const ComponentName = toPascalCase(iconNameKebab);
    const iconNode = icons[ComponentName];
    if (!iconNode) {
      console.warn(`${element.outerHTML} icon name was not found in the provided icons object.`);
      return;
    }
    const elementAttrs = getAttrs(element);
    const iconAttrs = { ...defaultAttributes, 'data-lucide': iconNameKebab, ...attrs, ...elementAttrs };
    const classNames = combineClassNames(['lucide', `lucide-${iconNameKebab}`, elementAttrs, attrs]);
    if (classNames) iconAttrs.class = classNames;
    const svgElement = createElement(iconNode, iconAttrs);
    element.parentNode && element.parentNode.replaceChild(svgElement, element);
  };

  // --- Icons (subset) ---
  const Target = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['circle', { cx: '12', cy: '12', r: '6' }],
    ['circle', { cx: '12', cy: '12', r: '2' }]
  ];

  const ClipboardList = [
    ['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1', ry: '1' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }],
    ['path', { d: 'M12 11h4' }],
    ['path', { d: 'M12 16h4' }],
    ['path', { d: 'M8 11h.01' }],
    ['path', { d: 'M8 16h.01' }]
  ];

  const CircleCheck = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'm9 12 2 2 4-4' }]
  ];

  const Calendar = [
    ['path', { d: 'M8 2v4' }],
    ['path', { d: 'M16 2v4' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }],
    ['path', { d: 'M3 10h18' }]
  ];

  const Book = [[
    'path',
    { d: 'M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20' }
  ]];

  const Search = [
    ['path', { d: 'm21 21-4.34-4.34' }],
    ['circle', { cx: '11', cy: '11', r: '8' }]
  ];

  const MessageCircle = [[
    'path',
    { d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719' }
  ]];

  const MessageCircleCode = [
    ['path', { d: 'm10 9-3 3 3 3' }],
    ['path', { d: 'm14 15 3-3-3-3' }],
    ['path', { d: 'M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719' }]
  ];

  const SquareCheckBig = [
    ['path', { d: 'M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344' }],
    ['path', { d: 'm9 11 3 3L22 4' }]
  ];

  const SquareCheck = [
    ['rect', { width: '18', height: '18', x: '3', y: '3', rx: '2' }],
    ['path', { d: 'm9 12 2 2 4-4' }]
  ];

  const ClipboardPen = [
    ['rect', { width: '8', height: '4', x: '8', y: '2', rx: '1' }],
    ['path', { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5.5' }],
    ['path', { d: 'M4 13.5V6a2 2 0 0 1 2-2h2' }],
    ['path', { d: 'M13.378 15.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z' }]
  ];

  const Clock = [
    ['path', { d: 'M12 6v6l4 2' }],
    ['circle', { cx: '12', cy: '12', r: '10' }]
  ];

  const CalendarCheck = [
    ['path', { d: 'M8 2v4' }],
    ['path', { d: 'M16 2v4' }],
    ['rect', { width: '18', height: '18', x: '3', y: '4', rx: '2' }],
    ['path', { d: 'M3 10h18' }],
    ['path', { d: 'm9 16 2 2 4-4' }]
  ];

  const Check = [['path', { d: 'M20 6 9 17l-5-5' }]];

  const GraduationCap = [
    ['path', { d: 'M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z' }],
    ['path', { d: 'M22 10v6' }],
    ['path', { d: 'M6 12.5V16a6 3 0 0 0 12 0v-3.5' }]
  ];

  const Palette = [
    ['path', { d: 'M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z' }],
    ['circle', { cx: '13.5', cy: '6.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '17.5', cy: '10.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '6.5', cy: '12.5', r: '.5', fill: 'currentColor' }],
    ['circle', { cx: '8.5', cy: '7.5', r: '.5', fill: 'currentColor' }]
  ];

  const Settings = [
    ['path', { d: 'M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' }],
    ['circle', { cx: '12', cy: '12', r: '3' }]
  ];

  const Brain = [
    ['path', { d: 'M12 18V5' }],
    ['path', { d: 'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4' }],
    ['path', { d: 'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5' }],
    ['path', { d: 'M17.997 5.125a4 4 0 0 1 2.526 5.77' }],
    ['path', { d: 'M18 18a4 4 0 0 0 2-7.464' }],
    ['path', { d: 'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517' }],
    ['path', { d: 'M6 18a4 4 0 0 1-2-7.464' }],
    ['path', { d: 'M6.003 5.125a4 4 0 0 0-2.526 5.77' }]
  ];

  const Briefcase = [
    ['path', { d: 'M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16' }],
    ['rect', { width: '20', height: '14', x: '2', y: '6', rx: '2' }]
  ];

  const Heart = [
    ['path', { d: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z' }]
  ];

  const Code = [
    ['path', { d: 'm16 18 6-6-6-6' }],
    ['path', { d: 'm8 6-6 6 6 6' }]
  ];

  const CodeXml = [
    ['path', { d: 'm18 16 4-4-4-4' }],
    ['path', { d: 'm6 8-4 4 4 4' }],
    ['path', { d: 'm14.5 4-5 16' }]
  ];

  const Smartphone = [
    ['rect', { width: '14', height: '20', x: '5', y: '2', rx: '2', ry: '2' }],
    ['path', { d: 'M12 18h.01' }]
  ];

  const Layers = [
    ['path', { d: 'M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z' }],
    ['path', { d: 'M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12' }],
    ['path', { d: 'M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17' }]
  ];

  // Close icon
  const X = [
    ['path', { d: 'M18 6 6 18' }],
    ['path', { d: 'm6 6 12 12' }]
  ];

  // Additional icons for C141 project
  const Mic = [
    ['path', { d: 'M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z' }],
    ['path', { d: 'M19 10v2a7 7 0 0 1-14 0v-2' }],
    ['line', { x1: '12', x2: '12', y1: '19', y2: '22' }]
  ];

  const Database = [
    ['ellipse', { cx: '12', cy: '5', rx: '9', ry: '3' }],
    ['path', { d: 'M3 5V19A9 3 0 0 0 21 19V5' }],
    ['path', { d: 'M3 12A9 3 0 0 0 21 12' }]
  ];

  const Globe = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20' }],
    ['path', { d: 'M2 12h20' }]
  ];

  const Component = [
    ['path', { d: 'M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z' }],
    ['path', { d: 'm12 2 3.5 3.5L12 9 8.5 5.5 12 2Z' }],
    ['path', { d: 'M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z' }],
    ['path', { d: 'm12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z' }]
  ];

  const Route = [
    ['circle', { cx: '6', cy: '19', r: '3' }],
    ['path', { d: 'M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15' }],
    ['circle', { cx: '18', cy: '5', r: '3' }]
  ];

  const GitBranch = [
    ['line', { x1: '6', x2: '6', y1: '3', y2: '15' }],
    ['circle', { cx: '18', cy: '6', r: '3' }],
    ['circle', { cx: '6', cy: '18', r: '3' }],
    ['path', { d: 'M18 9a9 9 0 0 1-9 9' }]
  ];

  const Lightbulb = [
    ['path', { d: 'M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5' }],
    ['path', { d: 'M9 18h6' }],
    ['path', { d: 'M10 22h4' }]
  ];

  const Sparkles = [
    ['path', { d: 'm12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z' }],
    ['path', { d: 'M5 3v4' }],
    ['path', { d: 'M19 17v4' }],
    ['path', { d: 'M3 5h4' }],
    ['path', { d: 'M17 19h4' }]
  ];

  // C122 additional icons
  const List = [
    ['line', { x1: '8', x2: '21', y1: '6', y2: '6' }],
    ['line', { x1: '8', x2: '21', y1: '12', y2: '12' }],
    ['line', { x1: '8', x2: '21', y1: '18', y2: '18' }],
    ['line', { x1: '3', x2: '3.01', y1: '6', y2: '6' }],
    ['line', { x1: '3', x2: '3.01', y1: '12', y2: '12' }],
    ['line', { x1: '3', x2: '3.01', y1: '18', y2: '18' }]
  ];

  const ArrowUpDown = [
    ['path', { d: 'm21 16-4 4-4-4' }],
    ['path', { d: 'M17 20V4' }],
    ['path', { d: 'm3 8 4-4 4 4' }],
    ['path', { d: 'M7 4v16' }]
  ];

  const PlusCircle = [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'M8 12h8' }],
    ['path', { d: 'M12 8v8' }]
  ];

  const Trash2 = [
    ['path', { d: 'M3 6h18' }],
    ['path', { d: 'M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' }],
    ['path', { d: 'M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' }],
    ['line', { x1: '10', x2: '10', y1: '11', y2: '17' }],
    ['line', { x1: '14', x2: '14', y1: '11', y2: '17' }]
  ];

  const Filter = [
    ['polygon', { points: '22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' }]
  ];

  const FileText = [
    ['path', { d: 'M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z' }],
    ['path', { d: 'M14 2v4a2 2 0 0 0 2 2h4' }],
    ['path', { d: 'M10 9H8' }],
    ['path', { d: 'M16 13H8' }],
    ['path', { d: 'M16 17H8' }]
  ];

  const FolderTree = [
    ['path', { d: 'M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z' }],
    ['path', { d: 'M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.88-.55H13a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Z' }],
    ['path', { d: 'M3 5a2 2 0 0 0 2 2h3' }],
    ['path', { d: 'M3 3v13a2 2 0 0 0 2 2h3' }]
  ];

  const Eye = [
    ['path', { d: 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0' }],
    ['circle', { cx: '12', cy: '12', r: '3' }]
  ];

  const Pencil = [
    ['path', { d: 'M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z' }],
    ['path', { d: 'm15 5 4 4' }]
  ];

  // Aliases used in this project
  const icons = {
    Target,
    ClipboardList,
    CheckCircle: CircleCheck,
    Calendar,
    Book,
    Search,
    MessageCircle,
    MessageCircleCode,
    CheckSquare: SquareCheckBig,
    ClipboardPen,
    Clock,
    CalendarCheck,
    Check,
    GraduationCap,
    Palette,
    Settings,
    Brain,
    Briefcase,
    Heart,
    Code,
    Smartphone,
    Layers,
    X,
    CheckCircle2: CircleCheck,
    Code2: CodeXml,
    Mic,
    Database,
    Globe,
    Component,
    Route,
    GitBranch,
    Lightbulb,
    Sparkles,
    // C122 additional icons
    List,
    ArrowUpDown,
    PlusCircle,
    Trash2,
    Filter,
    FileText,
    FolderTree,
    Eye,
    Pencil
  };

  function createIcons({ nameAttr = 'data-lucide', attrs = {}, root = document } = {}) {
    const elementsToReplace = root.querySelectorAll(`[${nameAttr}]`);
    Array.from(elementsToReplace).forEach((element) => replaceElement(element, { nameAttr, icons, attrs }));
  }

  global.lucide = { createIcons };
})(typeof window !== 'undefined' ? window : this);
