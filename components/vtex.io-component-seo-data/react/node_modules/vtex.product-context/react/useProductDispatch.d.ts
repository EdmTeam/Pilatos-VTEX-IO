/**
 * useProductDispatch hook. Use this hook to make changes to the data from the nearest
 * `ProductContext`.
 *
 * @returns `dispatch` function | `null`.
 */
declare function useProductDispatch(): import("react").Dispatch<import("./ProductContextProvider").Actions> | null;
export default useProductDispatch;
