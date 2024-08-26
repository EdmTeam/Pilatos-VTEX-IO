/**
 * useProduct hook. Use this hook to access the data from the nearest
 * `ProductContext`.
 *
 * Be aware that this could be an empty Object if used outside of a
 * `ProductContextProvider`.
 *
 * @returns `ProductContextState` | `undefined` | `{}`
 */
declare function useProduct(): Partial<import("./ProductContextProvider").ProductContextState> | undefined;
export default useProduct;
