declare module "lodash-move" {
  const fn: (list: number[], b: number, c: number) => number[];
  export default fn;
}
declare module "lodash" {
  export function clamp(n: number, lower: number, upper: number): number;
}
