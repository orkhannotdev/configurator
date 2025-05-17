import { Grid } from '@/3D/Styles/Grid';
import { TVStand } from '@/3D/TVStand';


describe('Static generating. Grid pattern', () => {
  test('.3 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .3, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.3);
    expect(stand.style.boxes.length).toBe(1);



    expect(stand.style.boxes[0].children[0].dimension.width).toBe(.26);
  });

   test('.59 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .59, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(.59);
    expect(stand.style.boxes.length).toBe(2);


    expect(stand.style.boxes[0].children[0].dimension.width).toBe(.26);
    expect(stand.style.boxes[0].children[1].dimension.width).toBe(.26);

    expect(stand.style.boxes[1].children[0].dimension.width).toBe(.55);
  });


  test('.8 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: .8, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(0.8);
    expect(stand.style.boxes.length).toBe(1);


    expect(stand.style.boxes[0].children[0].dimension.width).toBe(.37);
    expect(stand.style.boxes[0].children[1].dimension.width).toBe(.37);

  });

  test('1.5 meter', () => {
    const stand = new TVStand();
    const style = new Grid();

    stand.changeStyle(style);
    stand.resize({ width: 1.5, height: 1, depth: 1 });

    expect(stand.dimension.width).toBe(1.5);
    expect(stand.style.boxes.length).toBe(3);

    expect(stand.style.boxes[0].children.length).toBe(5);
    expect(stand.style.boxes[1].children.length).toBe(4);
    expect(stand.style.boxes[2].children.length).toBe(3);

    expect(stand.style.boxes[0].children[0].dimension.width).toBe(.28);
    expect(stand.style.boxes[0].children[1].dimension.width).toBe(.28);
    expect(stand.style.boxes[0].children[2].dimension.width).toBe(.28);
    expect(stand.style.boxes[0].children[3].dimension.width).toBe(.28);
    expect(stand.style.boxes[0].children[4].dimension.width).toBe(.28);

    expect(stand.style.boxes[1].children[0].dimension.width).toBe(.35);
    expect(stand.style.boxes[1].children[1].dimension.width).toBe(.35);
    expect(stand.style.boxes[1].children[2].dimension.width).toBe(.35);
    expect(stand.style.boxes[1].children[3].dimension.width).toBe(.35);


    expect(stand.style.boxes[2].children[0].dimension.width).toBe(.47);
    expect(stand.style.boxes[2].children[1].dimension.width).toBe(.47);
    expect(stand.style.boxes[2].children[2].dimension.width).toBe(.47);

  });



});

