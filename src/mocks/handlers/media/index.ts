import { treeHandlers } from './tree.handlers.js';
import { detailHandlers } from './detail.handlers.js';
import { itemHandlers } from './item.handlers.js';
import { moveHandlers } from './move.handlers.js';

export const handlers = [...treeHandlers, ...itemHandlers, ...moveHandlers, ...detailHandlers];
