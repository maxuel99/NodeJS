import './script-1.mjs';
import './script-2.mjs';

import { counterInstance } from "./counter.mjs";

counterInstance.output();

console.log("count:", counterInstance.count);