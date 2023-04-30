"use strict";

import { deleteAllData } from "./functions/delete-all-data.js";
import { queryAllData } from "./functions/query-all-data.js";
import { querySelectedData } from "./functions/query-selected-data.js";

queryAllData();
querySelectedData();
deleteAllData();
