import { Color } from "three";
import type { Theme } from "../../types";

export default {
    clearColor: new Color().setHex(0x82dbc5),
    backgroundColor: new Color().setHex(0xeab832),
    foregroundColor: new Color().setHex(0xffffff),
    activeColor: new Color().setHex(0x82dbc5),
} as Theme;