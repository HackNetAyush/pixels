// (() => {
//   let selectedElement = null;
  
//   // Property groups configuration
//   const propertyGroups = [
//     {
//       name: 'Layout',
//       properties: [
//         { id: 'display', type: 'select', label: 'Display', options: ['block', 'flex', 'inline', 'inline-block', 'grid', 'inline-flex', 'inline-grid', 'none'] },
//         { id: 'position', type: 'select', label: 'Position', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'] },
//         { id: 'top', type: 'text', label: 'Top' },
//         { id: 'right', type: 'text', label: 'Right' },
//         { id: 'bottom', type: 'text', label: 'Bottom' },
//         { id: 'left', type: 'text', label: 'Left' },
//         { id: 'width', type: 'text', label: 'Width' },
//         { id: 'height', type: 'text', label: 'Height' },
//         { id: 'min-width', type: 'text', label: 'Min Width' },
//         { id: 'min-height', type: 'text', label: 'Min Height' },
//         { id: 'max-width', type: 'text', label: 'Max Width' },
//         { id: 'max-height', type: 'text', label: 'Max Height' },
//         { id: 'z-index', type: 'number', label: 'Z-Index' },
//         { id: 'overflow', type: 'select', label: 'Overflow', options: ['visible', 'hidden', 'scroll', 'auto'] },
//         { id: 'overflow-x', type: 'select', label: 'Overflow X', options: ['visible', 'hidden', 'scroll', 'auto'] },
//         { id: 'overflow-y', type: 'select', label: 'Overflow Y', options: ['visible', 'hidden', 'scroll', 'auto'] },
//       ]
//     },
//     {
//       name: 'Flex',
//       properties: [
//         { id: 'flex-direction', type: 'select', label: 'Flex Direction', options: ['row', 'row-reverse', 'column', 'column-reverse'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'flex-wrap', type: 'select', label: 'Flex Wrap', options: ['nowrap', 'wrap', 'wrap-reverse'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'justify-content', type: 'select', label: 'Justify Content', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'align-items', type: 'select', label: 'Align Items', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'align-content', type: 'select', label: 'Align Content', options: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'flex-grow', type: 'number', label: 'Flex Grow', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'flex-shrink', type: 'number', label: 'Flex Shrink', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'flex-basis', type: 'text', label: 'Flex Basis', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//         { id: 'order', type: 'number', label: 'Order', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
//       ]
//     },
//     {
//       name: 'Spacing',
//       properties: [
//         { id: 'margin', type: 'text', label: 'Margin' },
//         { id: 'margin-top', type: 'text', label: 'Margin Top' },
//         { id: 'margin-right', type: 'text', label: 'Margin Right' },
//         { id: 'margin-bottom', type: 'text', label: 'Margin Bottom' },
//         { id: 'margin-left', type: 'text', label: 'Margin Left' },
//         { id: 'padding', type: 'text', label: 'Padding' },
//         { id: 'padding-top', type: 'text', label: 'Padding Top' },
//         { id: 'padding-right', type: 'text', label: 'Padding Right' },
//         { id: 'padding-bottom', type: 'text', label: 'Padding Bottom' },
//         { id: 'padding-left', type: 'text', label: 'Padding Left' },
//       ]
//     },
//     {
//       name: 'Background',
//       properties: [
//         { id: 'background-color', type: 'color', label: 'Background Color' },
//         { id: 'background-image', type: 'text', label: 'Background Image' },
//         { id: 'background-size', type: 'select', label: 'Background Size', options: ['auto', 'cover', 'contain'] },
//         { id: 'background-position', type: 'text', label: 'Background Position' },
//         { id: 'background-repeat', type: 'select', label: 'Background Repeat', options: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'] },
//         { id: 'background-attachment', type: 'select', label: 'Background Attachment', options: ['scroll', 'fixed', 'local'] },
//         { id: 'background-blend-mode', type: 'select', label: 'Blend Mode', options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'] },
//         { id: 'opacity', type: 'range', label: 'Opacity', min: 0, max: 1, step: 0.1 },
//       ]
//     },
//     {
//       name: 'Border',
//       properties: [
//         { id: 'border', type: 'text', label: 'Border' },
//         { id: 'border-width', type: 'text', label: 'Border Width' },
//         { id: 'border-style', type: 'select', label: 'Border Style', options: ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'] },
//         { id: 'border-color', type: 'color', label: 'Border Color' },
//         { id: 'border-radius', type: 'text', label: 'Border Radius' },
//         { id: 'border-top-left-radius', type: 'text', label: 'Top Left Radius' },
//         { id: 'border-top-right-radius', type: 'text', label: 'Top Right Radius' },
//         { id: 'border-bottom-right-radius', type: 'text', label: 'Bottom Right Radius' },
//         { id: 'border-bottom-left-radius', type: 'text', label: 'Bottom Left' },
//       ]
//     },
//     {
//       name: 'Text',
//       properties: [
//         { id: 'color', type: 'color', label: 'Text Color' },
//         { id: 'font-family', type: 'text', label: 'Font Family' },
//         { id: 'font-size', type: 'text', label: 'Font Size' },
//         { id: 'font-weight', type: 'select', label: 'Font Weight', options: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
//         { id: 'font-style', type: 'select', label: 'Font Style', options: ['normal', 'italic', 'oblique'] },
//         { id: 'text-align', type: 'select', label: 'Text Align', options: ['left', 'right', 'center', 'justify'] },
//         { id: 'text-decoration', type: 'select', label: 'Text Decoration', options: ['none', 'underline', 'overline', 'line-through', 'underline overline'] },
//         { id: 'text-transform', type: 'select', label: 'Text Transform', options: ['none', 'capitalize', 'uppercase', 'lowercase', 'full-width'] },
//         { id: 'line-height', type: 'text', label: 'Line Height' },
//         { id: 'letter-spacing', type: 'text', label: 'Letter Spacing' },
//         { id: 'word-spacing', type: 'text', label: 'Word Spacing' },
//         { id: 'text-shadow', type: 'text', label: 'Text Shadow' },
//       ]
//     },
//     {
//       name: 'Effects',
//       properties: [
//         { id: 'box-shadow', type: 'text', label: 'Box Shadow' },
//         { id: 'filter', type: 'text', label: 'Filter (e.g., blur(5px))' },
//         { id: 'backdrop-filter', type: 'text', label: 'Backdrop Filter' },
//         { id: 'mix-blend-mode', type: 'select', label: 'Blend Mode', options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'] },
//       ]
//     },
//     {
//       name: 'Transforms',
//       properties: [
//         { id: 'transform', type: 'text', label: 'Transform' },
//         { id: 'transform-origin', type: 'text', label: 'Transform Origin' },
//         { id: 'transition', type: 'text', label: 'Transition' },
//         { id: 'transition-property', type: 'text', label: 'Transition Property' },
//         { id: 'transition-duration', type: 'text', label: 'Transition Duration' },
//         { id: 'transition-timing-function', type: 'select', label: 'Timing Function', options: ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end'] },
//         { id: 'transition-delay', type: 'text', label: 'Transition Delay' },
//       ]
//     },
//     {
//       name: 'Grid',
//       properties: [
//         { id: 'grid-template-columns', type: 'text', label: 'Grid Template Columns', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'grid-template-rows', type: 'text', label: 'Grid Template Rows', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'grid-template-areas', type: 'text', label: 'Grid Template Areas', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'grid-gap', type: 'text', label: 'Grid Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'grid-row-gap', type: 'text', label: 'Grid Row Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'grid-column-gap', type: 'text', label: 'Grid Column Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'justify-items', type: 'select', label: 'Justify Items', options: ['start', 'end', 'center', 'stretch'], dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'align-items', type: 'select', label: 'Align Items', options: ['start', 'end', 'center', 'stretch'], dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//         { id: 'place-items', type: 'text', label: 'Place Items', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
//       ]
//     }
//   ];

//   // Create property input based on type
//   const createPropertyInput = (prop) => {
//     const container = document.createElement('div');
//     container.className = 'property-item';

//     const label = document.createElement('label');
//     label.htmlFor = `prop-${prop.id}`;
//     label.className = 'property-label';
//     label.textContent = prop.label;

//     let input;
//     switch (prop.type) {
//       case 'select':
//         input = document.createElement('select');
//         input.className = 'property-input select-input';
//         prop.options.forEach(opt => {
//           const optionEl = document.createElement('option');
//           optionEl.value = optionEl.textContent = opt;
//           input.appendChild(optionEl);
//         });
//         break;
//       case 'color':
//         input = document.createElement('input');
//         input.type = 'color';
//         input.className = 'property-input color-input';
//         break;
//       case 'range':
//         input = document.createElement('input');
//         input.type = 'range';
//         input.min = prop.min;
//         input.max = prop.max;
//         input.step = prop.step;
//         input.className = 'property-input range-input';
//         break;
//       case 'number':
//         input = document.createElement('input');
//         input.type = 'number';
//         input.className = 'property-input number-input';
//         break;
//       default:
//         input = document.createElement('input');
//         input.type = 'text';
//         input.className = 'property-input text-input';
//     }

//     input.id = `prop-${prop.id}`;
//     input.dataset.prop = prop.id;

//     container.append(label, input);
//     return { container, input };
//   };

//   const handlePropertyChange = (e) => {
//     if (!selectedElement) return;
//     const prop = e.target.dataset.prop;
//     let value = e.target.value;

//     if (prop === 'transform') {
//       const [x, y] = value.replace(/[^0-9,-]/g, '').split(',');
//       selectedElement.style.transform = `translate(${x || 0}px, ${y || 0}px)`;
//     } else {
//       selectedElement.style[prop] = value;
//     }
//     updateSelection(selectedElement);
//   };

//   const convertToHexColor = (color) => {
//     if (!color || ['transparent', 'rgba(0, 0, 0, 0)'].includes(color)) return '#000000';
//     if (color.startsWith('#')) return color;
//     if (color.startsWith('rgb')) {
//       const [r, g, b] = color.match(/\d+/g).slice(0, 3).map((v) => parseInt(v).toString(16).padStart(2, '0'));
//       return `#${r}${g}${b}`.toLowerCase();
//     }
//     const temp = document.createElement('div');
//     temp.style.color = color;
//     document.body.appendChild(temp);
//     const computed = getComputedStyle(temp).color;
//     document.body.removeChild(temp);
//     return convertToHexColor(computed);
//   };

//   const updatePropertyInputs = () => {
//     if (!selectedElement) return;
//     const style = getComputedStyle(selectedElement);

//     propertyGroups.forEach(group => {
//       group.properties.forEach(prop => {
//         const input = document.getElementById(`prop-${prop.id}`);
//         if (!input) return;

//         let value = style[prop.id];

//         if (prop.id === 'transform') {
//           if (value && value !== 'none') {
//             const m = new DOMMatrixReadOnly(value);
//             input.value = `${m.m41}px, ${m.m42}px`;
//           } else {
//             input.value = '';
//           }
//         } else if (prop.type === 'color' && value && value !== 'rgba(0, 0, 0, 0)') {
//           input.value = convertToHexColor(value);
//         } else if (prop.type === 'range') {
//           input.value = parseFloat(value) || 0;
//         } else if (prop.type === 'number') {
//           input.value = parseFloat(value) || '';
//         } else {
//           input.value = value || '';
//         }

//         if (prop.dependsOn) {
//           const dependsOnValue = style[prop.dependsOn.id];
//           const shouldShow = Array.isArray(prop.dependsOn.value) 
//             ? prop.dependsOn.value.includes(dependsOnValue) 
//             : dependsOnValue === prop.dependsOn.value;
//           input.closest('.property-item').style.display = shouldShow ? 'grid' : 'none';
//         }
//       });
//     });
//   };

//   const updateSelection = (element) => {
//     document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
//     if (element) {
//       element.classList.add('selected');
//       selectedElement = element;
//       updatePropertyInputs();
//       document.querySelector('.property-panel').classList.remove('hidden');
//     } else {
//       selectedElement = null;
//       document.querySelector('.property-panel').classList.add('hidden');
//     }
//   };

//   const initPropertyPanel = () => {
//     const panel = document.createElement('aside');
//     panel.className = 'property-panel hidden';

//     propertyGroups.forEach(group => {
//       const groupEl = document.createElement('section');
//       groupEl.className = 'property-group';

//       const title = document.createElement('h3');
//       title.className = 'property-group-title';
//       title.textContent = group.name;
//       groupEl.appendChild(title);

//       group.properties.forEach(prop => {
//         const { container, input } = createPropertyInput(prop);
//         input.addEventListener('change', handlePropertyChange);
//         groupEl.appendChild(container);
//       });
//       panel.appendChild(groupEl);
//     });

//     const sidebar = document.querySelector('.sidebar');
//     if (sidebar) {
//       sidebar.innerHTML = '';
//       sidebar.appendChild(panel);
//     }

//     document.addEventListener('click', e => {
//       const target = e.target.closest('[data-draggable]');
//       if (target) {
//         e.preventDefault();
//         updateSelection(target);
//       } else if ([document.documentElement, document.body].includes(e.target)) {
//         updateSelection(null);
//       }
//     });
//   };

//   // Inject styles for the property panel
//   const injectStyles = () => {
//     const style = document.createElement('style');
//     style.textContent = `
//       :root {
//         --color-bg: #fff;
//         --color-border: #e2e8f0;
//         --color-text: #2d3748;
//         --color-highlight: #3182ce;
//         --color-input-bg: #f7fafc;
//         --color-input-border: #cbd5e0;
//         --transition-speed: 0.2s;
//       }
//       .property-panel {
//         background: var(--color-bg);
//         border-left: 1px solid var(--color-border);
//         padding: 1rem;
//         overflow-y: auto;
//         height: 100vh;
//         width: 320px;
//         box-shadow: -2px 0 8px rgba(0,0,0,0.05);
//         font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         color: var(--color-text);
//         display: grid;
//         grid-template-rows: auto 1fr;
//         gap: 1.5rem;
//       }
//       .property-group {
//         border-bottom: 1px solid var(--color-border);
//         padding-bottom: 1rem;
//       }
//       .property-group-title {
//         font-weight: 600;
//         font-size: 1.1rem;
//         margin-bottom: 0.75rem;
//         color: var(--color-highlight);
//         border-bottom: 2px solid var(--color-highlight);
//         padding-bottom: 0.25rem;
//       }
//       .property-item {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         align-items: center;
//         gap: 0.5rem 1rem;
//         margin-bottom: 0.75rem;
//       }
//       .property-label {
//         font-size: 0.85rem;
//         font-weight: 500;
//         white-space: nowrap;
//         color: var(--color-text);
//       }
//       .property-input {
//         padding: 0.3rem 0.5rem;
//         font-size: 0.85rem;
//         border: 1px solid var(--color-input-border);
//         border-radius: 4px;
//         background: var(--color-input-bg);
//         transition: border-color var(--transition-speed) ease;
//         outline-offset: 2px;
//       }
//       .property-input:focus {
//         border-color: var(--color-highlight);
//         box-shadow: 0 0 5px var(--color-highlight);
//       }
//       select.property-input {
//         -webkit-appearance: none;
//         -moz-appearance: none;
//         appearance: none;
//         background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%233182ce" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6"/></svg>');
//         background-repeat: no-repeat;
//         background-position: right 0.5rem center;
//         background-size: 1em;
//         padding-right: 1.75rem;
//         cursor: pointer;
//       }
//       .property-input[type="color"] {
//         padding: 0;
//         height: 2rem;
//         width: 2.5rem;
//         border-radius: 4px;
//         border: none;
//         cursor: pointer;
//       }
//       .selected {
//         outline: 3px solid var(--color-highlight);
//         outline-offset: 2px;
//         transition: outline-color var(--transition-speed);
//       }
//     `;
//     document.head.appendChild(style);
//   };

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', () => {
//       injectStyles();
//       initPropertyPanel();
//     });
//   } else {
//     injectStyles();
//     initPropertyPanel();
//   }
// })();





(() => {
  let selectedElement = null;

  // Property groups with extended flex properties and dependencies for dynamic visibility
  const propertyGroups = [
    {
      name: 'Layout',
      properties: [
        { id: 'display', type: 'select', label: 'Display', options: ['block', 'flex', 'inline', 'inline-block', 'grid', 'inline-flex', 'inline-grid', 'none'] },
        { id: 'position', type: 'select', label: 'Position', options: ['static', 'relative', 'absolute', 'fixed', 'sticky'] },
        { id: 'top', type: 'text', label: 'Top' },
        { id: 'right', type: 'text', label: 'Right' },
        { id: 'bottom', type: 'text', label: 'Bottom' },
        { id: 'left', type: 'text', label: 'Left' },
        { id: 'width', type: 'text', label: 'Width' },
        { id: 'height', type: 'text', label: 'Height' },
        { id: 'min-width', type: 'text', label: 'Min Width' },
        { id: 'min-height', type: 'text', label: 'Min Height' },
        { id: 'max-width', type: 'text', label: 'Max Width' },
        { id: 'max-height', type: 'text', label: 'Max Height' },
        { id: 'z-index', type: 'number', label: 'Z-Index' },
        { id: 'overflow', type: 'select', label: 'Overflow', options: ['visible', 'hidden', 'scroll', 'auto'] },
        { id: 'overflow-x', type: 'select', label: 'Overflow X', options: ['visible', 'hidden', 'scroll', 'auto'] },
        { id: 'overflow-y', type: 'select', label: 'Overflow Y', options: ['visible', 'hidden', 'scroll', 'auto'] },
      ],
    },
    {
      name: 'Flex Container',
      properties: [
        { id: 'flex-direction', type: 'select', label: 'Flex Direction', options: ['row', 'row-reverse', 'column', 'column-reverse'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'flex-wrap', type: 'select', label: 'Flex Wrap', options: ['nowrap', 'wrap', 'wrap-reverse'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'flex-flow', type: 'text', label: 'Flex Flow (shorthand)', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'justify-content', type: 'select', label: 'Justify Content', options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'align-items', type: 'select', label: 'Align Items', options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'align-content', type: 'select', label: 'Align Content', options: ['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around'], dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'gap', type: 'text', label: 'Gap', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'row-gap', type: 'text', label: 'Row Gap', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
        { id: 'column-gap', type: 'text', label: 'Column Gap', dependsOn: { id: 'display', value: ['flex', 'inline-flex'] } },
      ],
    },
    {
      name: 'Flex Items',
      properties: [
        { id: 'order', type: 'number', label: 'Order', dependsOnParent: true },
        { id: 'flex-grow', type: 'number', label: 'Flex Grow', dependsOnParent: true },
        { id: 'flex-shrink', type: 'number', label: 'Flex Shrink', dependsOnParent: true },
        { id: 'flex-basis', type: 'text', label: 'Flex Basis', dependsOnParent: true },
        { id: 'align-self', type: 'select', label: 'Align Self', options: ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'], dependsOnParent: true },
      ],
    },
    {
      name: 'Spacing',
      properties: [
        { id: 'margin', type: 'text', label: 'Margin' },
        { id: 'margin-top', type: 'text', label: 'Margin Top' },
        { id: 'margin-right', type: 'text', label: 'Margin Right' },
        { id: 'margin-bottom', type: 'text', label: 'Margin Bottom' },
        { id: 'margin-left', type: 'text', label: 'Margin Left' },
        { id: 'padding', type: 'text', label: 'Padding' },
        { id: 'padding-top', type: 'text', label: 'Padding Top' },
        { id: 'padding-right', type: 'text', label: 'Padding Right' },
        { id: 'padding-bottom', type: 'text', label: 'Padding Bottom' },
        { id: 'padding-left', type: 'text', label: 'Padding Left' },
      ],
    },
    {
      name: 'Background',
      properties: [
        { id: 'background-color', type: 'color', label: 'Background Color' },
        { id: 'background-image', type: 'text', label: 'Background Image' },
        { id: 'background-size', type: 'select', label: 'Background Size', options: ['auto', 'cover', 'contain'] },
        { id: 'background-position', type: 'text', label: 'Background Position' },
        { id: 'background-repeat', type: 'select', label: 'Background Repeat', options: ['repeat', 'repeat-x', 'repeat-y', 'no-repeat'] },
        { id: 'background-attachment', type: 'select', label: 'Background Attachment', options: ['scroll', 'fixed', 'local'] },
        { id: 'background-blend-mode', type: 'select', label: 'Blend Mode', options: ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'] },
        { id: 'opacity', type: 'range', label: 'Opacity', min: 0, max: 1, step: 0.05 },
      ],
    },
    {
      name: 'Border',
      properties: [
        { id: 'border', type: 'text', label: 'Border' },
        { id: 'border-width', type: 'text', label: 'Border Width' },
        { id: 'border-style', type: 'select', label: 'Border Style', options: ['none','hidden','dotted','dashed','solid','double','groove','ridge','inset','outset'] },
        { id: 'border-color', type: 'color', label: 'Border Color' },
        { id: 'border-radius', type: 'text', label: 'Border Radius' },
        { id: 'border-top-left-radius', type: 'text', label: 'Top Left Radius' },
        { id: 'border-top-right-radius', type: 'text', label: 'Top Right Radius' },
        { id: 'border-bottom-right-radius', type: 'text', label: 'Bottom Right Radius' },
        { id: 'border-bottom-left-radius', type: 'text', label: 'Bottom Left Radius' },
      ],
    },
    {
      name: 'Text',
      properties: [
        { id: 'color', type: 'color', label: 'Text Color' },
        { id: 'font-family', type: 'text', label: 'Font Family' },
        { id: 'font-size', type: 'text', label: 'Font Size' },
        { id: 'font-weight', type: 'select', label: 'Font Weight', options: ['normal','bold','bolder','lighter','100','200','300','400','500','600','700','800','900'] },
        { id: 'font-style', type: 'select', label: 'Font Style', options: ['normal','italic','oblique'] },
        { id: 'text-align', type: 'select', label: 'Text Align', options: ['left','right','center','justify'] },
        { id: 'text-decoration', type: 'select', label: 'Text Decoration', options: ['none','underline','overline','line-through','underline overline'] },
        { id: 'text-transform', type: 'select', label: 'Text Transform', options: ['none','capitalize','uppercase','lowercase','full-width'] },
        { id: 'line-height', type: 'text', label: 'Line Height' },
        { id: 'letter-spacing', type: 'text', label: 'Letter Spacing' },
        { id: 'word-spacing', type: 'text', label: 'Word Spacing' },
        { id: 'text-shadow', type: 'text', label: 'Text Shadow' },
      ],
    },
    {
      name: 'Effects',
      properties: [
        { id: 'box-shadow', type: 'text', label: 'Box Shadow' },
        { id: 'filter', type: 'text', label: 'Filter (e.g., blur(5px))' },
        { id: 'backdrop-filter', type: 'text', label: 'Backdrop Filter' },
        { id: 'mix-blend-mode', type: 'select', label: 'Blend Mode', options: ['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'] },
      ],
    },
    {
      name: 'Transforms & Transitions',
      properties: [
        { id: 'transform', type: 'text', label: 'Transform (e.g., translateX(10px))' },
        { id: 'transform-origin', type: 'text', label: 'Transform Origin' },
        { id: 'transition', type: 'text', label: 'Transition' },
        { id: 'transition-property', type: 'text', label: 'Transition Property' },
        { id: 'transition-duration', type: 'text', label: 'Transition Duration' },
        { id: 'transition-timing-function', type: 'select', label: 'Timing Function', options: ['ease','ease-in','ease-out','ease-in-out','linear','step-start','step-end'] },
        { id: 'transition-delay', type: 'text', label: 'Transition Delay' },
      ],
    },
    {
      name: 'Grid',
      properties: [
        { id: 'grid-template-columns', type: 'text', label: 'Grid Template Columns', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'grid-template-rows', type: 'text', label: 'Grid Template Rows', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'grid-template-areas', type: 'text', label: 'Grid Template Areas', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'grid-gap', type: 'text', label: 'Grid Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'grid-row-gap', type: 'text', label: 'Grid Row Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'grid-column-gap', type: 'text', label: 'Grid Column Gap', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'justify-items', type: 'select', label: 'Justify Items', options: ['start', 'end', 'center', 'stretch'], dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'align-items', type: 'select', label: 'Align Items', options: ['start', 'end', 'center', 'stretch'], dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
        { id: 'place-items', type: 'text', label: 'Place Items', dependsOn: { id: 'display', value: ['grid', 'inline-grid'] } },
      ],
    },
  ];

  // Create property input based on type
  const createPropertyInput = (prop) => {
    const container = document.createElement('div');
    container.className = 'property-item';

    const label = document.createElement('label');
    label.htmlFor = `prop-${prop.id}`;
    label.className = 'property-label';
    label.textContent = prop.label;

    let input;
    switch (prop.type) {
      case 'select':
        input = document.createElement('select');
        input.className = 'property-input select-input';
        prop.options.forEach(opt => {
          const optionEl = document.createElement('option');
          optionEl.value = optionEl.textContent = opt;
          input.appendChild(optionEl);
        });
        break;
      case 'color':
        input = document.createElement('input');
        input.type = 'color';
        input.className = 'property-input color-input';
        break;
      case 'range':
        input = document.createElement('input');
        input.type = 'range';
        input.min = prop.min;
        input.max = prop.max;
        input.step = prop.step;
        input.className = 'property-input range-input';
        break;
      case 'number':
        input = document.createElement('input');
        input.type = 'number';
        input.className = 'property-input number-input';
        break;
      default:
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'property-input text-input';
    }

    input.id = `prop-${prop.id}`;
    input.dataset.prop = prop.id;

    container.append(label, input);
    return { container, input };
  };

  // Convert color values to hex for color inputs
  const convertToHexColor = (color) => {
    if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return '#000000';
    if (color.startsWith('#')) return color;
    if (/^rgb/.test(color)) {
      const [r,g,b] = color.match(/\d+/g).slice(0,3).map(v => parseInt(v).toString(16).padStart(2,'0'));
      return `#${r}${g}${b}`.toLowerCase();
    }
    const temp = document.createElement('div');
    temp.style.color = color;
    document.body.appendChild(temp);
    const computed = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return convertToHexColor(computed);
  };

  // Update inputs when selection changes or on property update
  const updatePropertyInputs = () => {
    if (!selectedElement) return;
    const style = getComputedStyle(selectedElement);

    propertyGroups.forEach(group => {
      group.properties.forEach(prop => {
        const input = document.getElementById(`prop-${prop.id}`);
        if (!input) return;

        // For flex item properties, only show if selected element is flex item
        if (prop.dependsOnParent && !selectedElement.parentElement) {
          input.closest('.property-item').style.display = 'none';
          return;
        }
        if (prop.dependsOnParent) {
          // Show only if parent container is flex or inline-flex
          const parentStyle = selectedElement.parentElement ? getComputedStyle(selectedElement.parentElement) : null;
          const parentDisplay = parentStyle ? parentStyle.display : null;
          const visible = parentDisplay === 'flex' || parentDisplay === 'inline-flex';
          input.closest('.property-item').style.display = visible ? 'grid' : 'none';
          if (!visible) return;
        }

        // Check dependsOn for container properties
        if (prop.dependsOn) {
          const dependsOnValue = style[prop.dependsOn.id];
          const shouldShow = Array.isArray(prop.dependsOn.value) 
            ? prop.dependsOn.value.includes(dependsOnValue)
            : dependsOnValue === prop.dependsOn.value;
          input.closest('.property-item').style.display = shouldShow ? 'grid' : 'none';
          if (!shouldShow) return;
        }

        let value = style[prop.id];

        if (prop.type === 'color') {
          input.value = convertToHexColor(value);
        } else if (prop.type === 'range') {
          input.value = parseFloat(value) || 0;
        } else if (prop.type === 'number') {
          input.value = parseFloat(value) || '';
        } else {
          input.value = value || '';
        }
      });
    });
  };

  // Update styles for selected element when input changes
  const handlePropertyChange = (e) => {
    if (!selectedElement) return;
    const prop = e.target.dataset.prop;
    let value = e.target.value;

    if (prop === 'transform') {
      selectedElement.style.transform = value || 'none';
    } else if (prop === 'opacity') {
      selectedElement.style.opacity = value;
    } else if (prop === 'order' || prop === 'flex-grow' || prop === 'flex-shrink') {
      selectedElement.style[prop] = value !== '' ? value : '';
    } else {
      selectedElement.style[prop] = value || '';
    }

    updateSelection(selectedElement);
  };

  // Highlight selected element and show property panel
  const updateSelection = (element) => {
    document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
    if (element) {
      element.classList.add('selected');
      selectedElement = element;
      updatePropertyInputs();
      document.querySelector('.property-panel').classList.remove('hidden');
    } else {
      selectedElement = null;
      document.querySelector('.property-panel').classList.add('hidden');
    }
  };

  // Initialize property panel and attach events
  const initPropertyPanel = () => {
    const panel = document.createElement('aside');
    panel.className = 'property-panel hidden';

    propertyGroups.forEach(group => {
      const groupEl = document.createElement('section');
      groupEl.className = 'property-group';

      const title = document.createElement('h3');
      title.className = 'property-group-title';
      title.textContent = group.name;
      groupEl.appendChild(title);

      group.properties.forEach(prop => {
        const { container, input } = createPropertyInput(prop);
        input.addEventListener('input', handlePropertyChange);
        groupEl.appendChild(container);
      });

      panel.appendChild(groupEl);
    });

    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.innerHTML = '';
      sidebar.appendChild(panel);
    }

    document.addEventListener('click', e => {
      const target = e.target.closest('[data-draggable]');
      if (target) {
        e.preventDefault();
        updateSelection(target);
      } else if ([document.documentElement, document.body].includes(e.target)) {
        updateSelection(null);
      }
    });
  };

  // Inject styles for the property panel UI
  const injectStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --color-bg: #fff;
        --color-border: #ddd;
        --color-text: #333;
        --color-highlight: #3182ce;
        --color-input-bg: #f7f7f7;
        --color-input-border: #ccc;
        --transition-speed: 0.25s;
      }
      .property-panel {
        background: var(--color-bg);
        border-left: 1px solid var(--color-border);
        padding: 1rem 1.25rem;
        overflow-y: auto;
        height: 100vh;
        width: 360px;
        box-shadow: -3px 0 8px rgba(0,0,0,0.1);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: var(--color-text);
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        z-index: 9999;
        position: fixed;
        right: 0;
        top: 0;
      }
      .property-group {
        border-bottom: 1px solid var(--color-border);
        padding-bottom: 1rem;
      }
      .property-group-title {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 1rem;
        color: var(--color-highlight);
        border-bottom: 2px solid var(--color-highlight);
        padding-bottom: 0.35rem;
      }
      .property-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem 1rem;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      .property-label {
        font-weight: 600;
        font-size: 0.9rem;
        user-select: none;
      }
      .property-input {
        width: 100%;
        font-size: 0.9rem;
        padding: 0.35rem 0.5rem;
        border-radius: 4px;
        border: 1px solid var(--color-input-border);
        background: var(--color-input-bg);
        transition: border-color var(--transition-speed);
        outline-offset: 2px;
      }
      .property-input:focus {
        border-color: var(--color-highlight);
        box-shadow: 0 0 6px var(--color-highlight);
      }
      select.property-input {
        appearance: none;
        background-image: url('data:image/svg+xml;utf8,<svg fill="none" stroke="%233182ce" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9l6 6 6-6"/></svg>');
        background-repeat: no-repeat;
        background-position: right 0.5rem center;
        background-size: 1.25em;
        cursor: pointer;
        padding-right: 1.75rem;
      }
      input[type=color].property-input {
        padding: 0;
        height: 2rem;
        width: 2.5rem;
        border-radius: 4px;
        border: none;
        cursor: pointer;
      }
      .selected {
        outline: 3px solid var(--color-highlight);
        outline-offset: 3px;
        transition: outline-color 0.3s;
      }
      .property-panel.hidden {
        display: none;
      }
    `;
    document.head.appendChild(style);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectStyles();
      initPropertyPanel();
    });
  } else {
    injectStyles();
    initPropertyPanel();
  }
})();
