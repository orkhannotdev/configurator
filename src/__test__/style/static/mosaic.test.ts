import { Mosaic } from '@/3D/Styles/Mosaic';
import { TVStand } from '@/3D/TVStand';

describe('Static generating. Mosaic pattern', () => {

  test('box columns .58 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.58, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.58);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(1);
  });


  test('box columns .59 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.59, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.59);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(2);
  });

  test('box columns .75 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.75, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.75);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(2);
  });
  
  test('box columns .78 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.78, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.78);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(3);
  });
  
  
  test('box columns 1.34 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 1.34, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.34);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(3);
  });
  
  test('box columns 1.35 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 1.35, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.35);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(4);
  });

  test('order', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    const res = (stand.style as Mosaic).generateOrder(10)
    expect(res.length).toBe(10);

    expect((stand.style as Mosaic).generateOrder(5).length).toBe(5);
    expect((stand.style as Mosaic).generateOrder(2).length).toBe(2);
    expect((stand.style as Mosaic).generateOrder(26).length).toBe(26);

    const s = 'static', d = 'dynamic';
    expect((stand.style as Mosaic).generateOrder(26)).toEqual([d, s, d, d, s, d, d, d, s, d, d, d, d, s, d, d, d, d, d, s, d, d, d, d, d, d]);

  });

});
