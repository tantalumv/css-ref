import { describe, it, expect, beforeEach } from 'vitest';
import { CC, IL, IC } from './constants';
import { P, CATS, INTEROPS } from './data';
import { filtered, hasFilters } from './filters';
import { bIcon } from './utils';
import { activeCats, activeInterops, q, resetFilters, setQuery, toggleCat, toggleInterop } from './state';

describe('CSS Ref App', () => {
  beforeEach(() => {
    resetFilters();
  });

  describe('Constants', () => {
    it('should have category colors defined', () => {
      expect(CC.Layout).toBe('#6366f1');
      expect(CC.Flexbox).toBe('#8b5cf6');
      expect(CC.Grid).toBe('#7c3aed');
    });

    it('should have interop labels defined', () => {
      expect(IL.wide).toContain('Widely Available');
      expect(IL.b2024).toContain('Baseline 2024');
      expect(IL.exp).toContain('Experimental');
    });

    it('should have interop colors defined', () => {
      expect(IC.wide).toBe('#15803d');
      expect(IC.exp).toBe('#b91c1c');
    });
  });

  describe('Data', () => {
    it('should have CSS properties loaded', () => {
      expect(P.length).toBeGreaterThan(0);
      expect(P[0]).toHaveProperty('n'); // name
      expect(P[0]).toHaveProperty('c'); // category
      expect(P[0]).toHaveProperty('d'); // description
      expect(P[0]).toHaveProperty('s'); // browser support
      expect(P[0]).toHaveProperty('i'); // interop status
    });

    it('should have unique categories', () => {
      const categories = [...new Set(P.map(p => p.c))];
      expect(CATS.length).toBe(categories.length);
      expect(CATS).toContain('Layout');
      expect(CATS).toContain('Flexbox');
      expect(CATS).toContain('Grid');
    });

    it('should have valid interop statuses', () => {
      const statuses = new Set(P.map(p => p.i));
      statuses.forEach(status => {
        expect(INTEROPS).toContain(status);
      });
    });
  });

  describe('Filter Logic', () => {
    it('should return all items when no filters active', () => {
      const result = filtered();
      expect(result.length).toBe(P.length);
    });

    it('should filter by category', () => {
      toggleCat('Layout');
      const result = filtered();
      expect(result.every(p => p.c === 'Layout')).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThan(P.length);
    });

    it('should filter by multiple categories', () => {
      toggleCat('Layout');
      toggleCat('Flexbox');
      const result = filtered();
      expect(result.every(p => p.c === 'Layout' || p.c === 'Flexbox')).toBe(true);
    });

    it('should filter by interop status', () => {
      toggleInterop('wide');
      const result = filtered();
      expect(result.every(p => p.i === 'wide')).toBe(true);
    });

    it('should filter by search query', () => {
      setQuery('flex');
      const result = filtered();
      expect(result.every(p => 
        p.n.toLowerCase().includes('flex') ||
        p.d.toLowerCase().includes('flex') ||
        p.c.toLowerCase().includes('flex')
      )).toBe(true);
    });

    it('should combine category and search filters', () => {
      toggleCat('Layout');
      setQuery('position');
      const result = filtered();
      expect(result.every(p => p.c === 'Layout')).toBe(true);
      expect(result.every(p => 
        p.n.toLowerCase().includes('position') ||
        p.d.toLowerCase().includes('position')
      )).toBe(true);
    });

    it('should return empty array when no matches', () => {
      setQuery('xyznonexistent');
      const result = filtered();
      expect(result).toEqual([]);
    });
  });

  describe('hasFilters', () => {
    it('should return false when no filters active', () => {
      expect(hasFilters()).toBe(false);
    });

    it('should return true when category filter active', () => {
      toggleCat('Layout');
      expect(hasFilters()).toBe(true);
    });

    it('should return true when interop filter active', () => {
      toggleInterop('wide');
      expect(hasFilters()).toBe(true);
    });
  });

  describe('bIcon', () => {
    it('should return supported icon for value 1', () => {
      const result = bIcon(1, 'ch');
      expect(result).toContain('y'); // class for supported
      expect(result).toContain('C'); // Chrome abbr
      expect(result).toContain('Chrome');
    });

    it('should return unsupported icon for value 0', () => {
      const result = bIcon(0, 'ff');
      expect(result).toContain('n'); // class for not supported
      expect(result).toContain('F'); // Firefox abbr
      expect(result).toContain('Firefox');
    });

    it('should return partial icon for other values', () => {
      const result = bIcon(0.5, 'sf');
      expect(result).toContain('p'); // class for partial
      expect(result).toContain('S'); // Safari abbr
      expect(result).toContain('Safari');
    });
  });

  describe('State Management', () => {
    it('should reset filters correctly', () => {
      toggleCat('Layout');
      toggleInterop('wide');
      setQuery('test');
      
      resetFilters();
      
      expect(activeCats.size).toBe(0);
      expect(activeInterops.size).toBe(0);
      expect(q).toBe('');
    });

    it('should toggle categories correctly', () => {
      toggleCat('Layout');
      expect(activeCats.has('Layout')).toBe(true);
      
      toggleCat('Layout');
      expect(activeCats.has('Layout')).toBe(false);
    });

    it('should toggle interop statuses correctly', () => {
      toggleInterop('wide');
      expect(activeInterops.has('wide')).toBe(true);
      
      toggleInterop('wide');
      expect(activeInterops.has('wide')).toBe(false);
    });
  });
});
