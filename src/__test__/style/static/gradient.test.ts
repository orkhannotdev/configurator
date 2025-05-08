import { Gradient } from '@/3D/Styles/Gradient';
import { TVStand } from '@/3D/TVStand';


describe('Static generating. Gradient pattern', () => {
  test('1 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1);
    expect(stand.style.box.children.length).toBe(2);



    expect(stand.style.box.children[0].dimension.width).toBe(.48);
    expect(stand.style.box.children[1].dimension.width).toBe(.46);
  });

  test('1.1 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1.1, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.1);
    expect(stand.style.box.children.length).toBe(2);


    expect(stand.style.box.children[0].dimension.width).toBe(.53);
    expect(stand.style.box.children[1].dimension.width).toBe(.50);
  });


  test('1.5 meter', () => {
    const stand = new TVStand();
    const style = new Gradient();

    stand.changeStyle(style);
    stand.resize({ width: 1.5, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.5);
    expect(stand.style.box.children.length).toBe(3);


    expect(stand.style.box.children[0].dimension.width).toBe(.44);
    expect(stand.style.box.children[1].dimension.width).toBe(.45);
    expect(stand.style.box.children[2].dimension.width).toBe(.53);
  });



});

