const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

// Хелпер: берёт товары по ID в указанном порядке
const pickByIds = (ids) => products.filter(({ id }) => ids.includes(id));

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((p) => p.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const input = pickByIds([1, 3, 4]);
    const result = sortProductsByPrice(input, 'asc');
    expect(result.map((p) => p.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((p) => p.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const input = pickByIds([3, 1, 4]);
    const result = sortProductsByPrice(input, 'desc');
    expect(result.map((p) => p.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const input = pickByIds([5, 2, 6]);
    const result = sortProductsByPrice(input, 'desc');
    expect(result.map((p) => p.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const input = pickByIds([1, 3, 4]);
    const idsBefore = input.map((p) => p.id); // [1, 3, 4]
    sortProductsByPrice(input, 'asc');
    expect(input.map((p) => p.id)).toEqual(idsBefore);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const input = pickByIds([1, 3, 4]);
    const idsBefore = input.map((p) => p.id); // [1, 3, 4]
    sortProductsByPrice(input, 'desc');
    expect(input.map((p) => p.id)).toEqual(idsBefore);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const idsBefore = products.map((p) => p.id); // [1, 2, 3, 4, 5, 6]
    sortProductsByPrice(products);
    expect(products.map((p) => p.id)).toEqual(idsBefore);
  });
});