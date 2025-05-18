import { Gradient } from '@/3D/Styles/Gradient';
import { TVStand } from '@/3D/TVStand';

describe('Static generating. Gradient pattern', () => {

  test('.59 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: .59, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.59);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(1);

    expect(mainBox.children[0].dimension.width).toBe(0.55);
  });

  test('1 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(2);

    expect(mainBox.children[0].dimension.width).toBe(0.48);
    expect(mainBox.children[1].dimension.width).toBe(0.46);
  });

  test('1.1 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1.1, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.1);

    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(2);

    expect(mainBox.children[0].dimension.width).toBe(0.53);
    expect(mainBox.children[1].dimension.width).toBe(0.51);
  });

  test('1.5 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1.5, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.5);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(3);

    expect(mainBox.children[0].dimension.width).toBe(0.44);
    expect(mainBox.children[1].dimension.width).toBe(0.45);
    expect(mainBox.children[2].dimension.width).toBe(0.53);
  });
  
  test('1.8 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1.8, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.8);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(4);

    expect(mainBox.children[0].dimension.width).toBe(0.44);
    expect(mainBox.children[1].dimension.width).toBe(0.38);
    expect(mainBox.children[2].dimension.width).toBe(0.44);
    expect(mainBox.children[3].dimension.width).toBe(0.44);
  });

  test('2 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 2, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(2);
    const mainBox = stand.style.boxes[0];

    expect(mainBox.children.length).toBe(4);

    expect(mainBox.children[0].dimension.width).toBe(0.43);
    expect(mainBox.children[1].dimension.width).toBe(0.38);
    expect(mainBox.children[2].dimension.width).toBe(0.59);
    expect(mainBox.children[3].dimension.width).toBe(0.56);
  });
});
