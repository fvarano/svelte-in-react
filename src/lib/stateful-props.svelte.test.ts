import { describe, it, expect } from 'vitest';
import { useStatefulProps } from './stateful-props.svelte';

describe('useStatefulProps', () => {
  it('should initialize with provided props', () => {
    const initialProps = { name: 'Test', count: 0 };
    const statefulProps = useStatefulProps(initialProps);
    
    expect(statefulProps.value).toEqual(initialProps);
  });
  
  it('should update props when update method is called', () => {
    const initialProps = { name: 'Test', count: 0 };
    const statefulProps = useStatefulProps(initialProps);
    
    const newProps = { name: 'Updated', count: 1 };
    statefulProps.update(newProps);
    
    expect(statefulProps.value).toEqual(newProps);
  });
  
  it('should allow direct value assignment', () => {
    const initialProps = { name: 'Test', count: 0 };
    const statefulProps = useStatefulProps(initialProps);
    
    const newProps = { name: 'Direct', count: 2 };
    statefulProps.value = newProps;
    
    expect(statefulProps.value).toEqual(newProps);
  });
});
