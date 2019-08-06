/**
 * Lightweight generate random id;
 * @returns number - id generated
 */
const id = (): number => new Date().getTime() + Math.random();


export {
  id,
};

export default {
  id,
};
