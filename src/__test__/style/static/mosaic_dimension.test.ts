import { Mosaic } from '@/3D/Styles/Mosaic';
import { TVStand } from '@/3D/TVStand';

describe('Static generating. Mosaic pattern', () => {

  test('box columns .58 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.58, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];
    expect(mainBox.children[0].dimension.width).toBe(0.54);

  });


  test('box columns .59 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.59, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.17);
    expect(mainBox.children[1].dimension.width).toBe(0.36);
  });
  
  test('box columns .69 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.69, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.17);
    expect(mainBox.children[1].dimension.width).toBe(0.46);

  });

  test('box columns .75 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.75, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.17);
    expect(mainBox.children[1].dimension.width).toBe(0.52);
  });

  test('box columns .77 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.77, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.17);
    expect(mainBox.children[1].dimension.width).toBe(0.54);
  });
  
  test('box columns .78 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 0.78, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.26);
    expect(mainBox.children[1].dimension.width).toBe(0.17);
    expect(mainBox.children[2].dimension.width).toBe(0.26);
  });

  test('box columns 1.34 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 1.34, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.54);
    expect(mainBox.children[1].dimension.width).toBe(0.17);
    expect(mainBox.children[2].dimension.width).toBe(0.54);
  });

  test('box columns 1.53 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: 1.53, height: 1, depth: 1 });

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children[0].dimension.width).toBe(0.42);
    expect(mainBox.children[1].dimension.width).toBe(0.17);
    expect(mainBox.children[2].dimension.width).toBe(0.42);
    expect(mainBox.children[3].dimension.width).toBe(0.42);
  });
});
