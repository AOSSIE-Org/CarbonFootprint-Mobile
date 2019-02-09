export const LOADER_TOGGLE = 'LOADER_TOGGLE';

export function loaderToggle() {
    console.log("Loader Toggle Action");
    return {
        type: LOADER_TOGGLE
    };
}