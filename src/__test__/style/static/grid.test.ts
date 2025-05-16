import { Grid } from '@/3D/Styles/Grid';
import { TVStand } from '@/3D/TVStand';


describe('Static generating. Gradient pattern', () => {
  test('.3 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .3, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.3);
    expect(stand.style.box.children.length).toBe(1);



    expect(stand.style.box.children[0].dimension.width).toBe(.26);
  });

   test('.59 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .59, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.59);
    expect(stand.style.box.children.length).toBe(2);


    expect(stand.style.box.children[0].dimension.width).toBe(.27);
    expect(stand.style.box.children[1].dimension.width).toBe(.27);
  });


  test('.8 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .8, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(0.8);
    expect(stand.style.box.children.length).toBe(2);


    expect(stand.style.box.children[0].dimension.width).toBe(.38);
    expect(stand.style.box.children[1].dimension.width).toBe(.38);
  });

  test('1.5 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: 1.5, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.5);
    expect(stand.style.box.children.length).toBe(3);


    expect(stand.style.box.children[0].dimension.width).toBe(.49);
    expect(stand.style.box.children[1].dimension.width).toBe(.49);
    expect(stand.style.box.children[2].dimension.width).toBe(.49);
  });



});

