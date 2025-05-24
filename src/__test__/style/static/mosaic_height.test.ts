import { Mosaic } from '@/3D/Styles/Mosaic';
import { TVStand } from '@/3D/TVStand';

const width = 2.5;

describe('Static generating. Mosaic pattern, Height', () => {

  test('height .43 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: width, height: .43, depth: 1 });

    const mainBox = stand.style.boxes[0];
    expect(mainBox.children[0].children.length).toBe(1)
    expect(mainBox.children[0].children[0].dimension.height).toBe(0.25)
    
    expect(mainBox.children[1].children.length).toBe(1)
    expect(mainBox.children[1].children[0].dimension.height).toBe(0.25)
    
    expect(mainBox.children[2].children.length).toBe(1)
    expect(mainBox.children[2].children[0].dimension.height).toBe(0.25)
    
  });
  
  test('height .53 meter', () => {
    const stand = new TVStand();
    const style = new Mosaic()

    stand.changeStyle(style);
    stand.resize({ width: width, height: .53, depth: 1 });

    const mainBox = stand.style.boxes[0];
    expect(mainBox.children[0].children.length).toBe(1)
    expect(mainBox.children[0].children[0].dimension.height).toBe(0.35)
    
    expect(mainBox.children[1].children.length).toBe(1)
    expect(mainBox.children[1].children[0].dimension.height).toBe(0.35)
    
    expect(mainBox.children[2].children.length).toBe(1)
    expect(mainBox.children[2].children[0].dimension.height).toBe(0.35)
    
    expect(mainBox.children[3].children.length).toBe(2)
    expect(mainBox.children[3].children[0].dimension.height).toBe(0.28)
    expect(mainBox.children[3].children[1].dimension.height).toBe(0.28)
    
  });

});
