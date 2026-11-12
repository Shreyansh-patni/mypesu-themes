/**
 * Lightweight, zero-dependency in-memory DOM mock for testing Page Adapters in Node/Vitest.
 */

export class MockElement {
  public tagName: string;
  public id: string = '';
  public classList: Set<string> = new Set();
  public attributes: Map<string, string> = new Map();
  public children: MockElement[] = [];
  public parent: MockElement | null = null;
  public textContent: string = '';
  public style: Record<string, string> = {};

  constructor(tagName: string, attributes: Record<string, string> = {}) {
    this.tagName = tagName.toLowerCase();
    for (const [k, v] of Object.entries(attributes)) {
      this.setAttribute(k, v);
    }
  }

  setAttribute(name: string, value: string): void {
    const lowerName = name.toLowerCase();
    this.attributes.set(lowerName, value);
    if (lowerName === 'id') {
      this.id = value;
    } else if (lowerName === 'class') {
      this.classList = new Set(value.trim().split(/\s+/).filter(Boolean));
    }
  }

  getAttribute(name: string): string | null {
    return this.attributes.get(name.toLowerCase()) ?? null;
  }

  hasAttribute(name: string): boolean {
    return this.attributes.has(name.toLowerCase());
  }

  removeAttribute(name: string): void {
    const lower = name.toLowerCase();
    this.attributes.delete(lower);
    if (lower === 'id') this.id = '';
    if (lower === 'class') this.classList.clear();
  }

  appendChild(child: MockElement): MockElement {
    child.parent = this;
    this.children.push(child);
    return child;
  }

  removeChild(child: MockElement): MockElement {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
    return child;
  }

  get parentNode(): MockElement | null {
    return this.parent;
  }

  // Recursive element traversal
  querySelectorAll(selector: string): MockElement[] {
    const results: MockElement[] = [];
    const normalized = selector.trim();

    // Check comma-separated selectors
    if (normalized.includes(',')) {
      const parts = normalized.split(',').map((p) => p.trim());
      const set = new Set<MockElement>();
      for (const p of parts) {
        for (const el of this.querySelectorAll(p)) {
          set.add(el);
        }
      }
      return Array.from(set);
    }

    // Match descendants
    const checkMatch = (el: MockElement, rule: string): boolean => {
      // Direct descendance chain (e.g. "A > B" or "A B")
      const tokens = rule.split(/\s+/).filter(Boolean);
      if (tokens.length > 1) {
        return false; // Handled by hierarchical search below
      }

      let target = rule;
      // Tag + ID (e.g. nav#pge_menu)
      if (target.includes('#')) {
        const [tag, id] = target.split('#');
        if (tag && el.tagName !== tag.toLowerCase()) return false;
        return el.id === id;
      }
      // Tag + Class (e.g. img.university-logo)
      if (target.includes('.')) {
        // Support multiple classes (e.g. .info-contents.announcements)
        const parts = target.split('.').filter(Boolean);
        const tag = target.startsWith('.') ? '' : parts[0];
        const classes = target.startsWith('.') ? parts : parts.slice(1);
        if (tag && el.tagName !== tag.toLowerCase()) return false;
        return classes.every((cls) => el.classList.has(cls));
      }
      // ID only
      if (target.startsWith('#')) {
        return el.id === target.slice(1);
      }
      // Class only
      if (target.startsWith('.')) {
        return el.classList.has(target.slice(1));
      }
      // Tag only
      return el.tagName === target.toLowerCase();
    };

    // Hierarchical selector (e.g. "nav#pge_menu .container-fluid header" or ".content-right footer")
    const matchHierarchy = (el: MockElement, parts: string[]): boolean => {
      if (parts.length === 0) return true;
      const last = parts[parts.length - 1];
      if (!last || last === '>') return false;

      let hasChildCombinator = false;
      let targetRule = last;
      if (parts.length >= 2 && parts[parts.length - 2] === '>') {
        hasChildCombinator = true;
      }

      if (!checkMatch(el, targetRule)) {
        return false;
      }

      if (parts.length === 1) {
        return true;
      }

      if (hasChildCombinator) {
        const parentRule = parts[parts.length - 3];
        if (!el.parent || !parentRule) return false;
        return matchHierarchy(el.parent, parts.slice(0, parts.length - 2));
      } else {
        // Ancestor matching
        let current = el.parent;
        const remaining = parts.slice(0, parts.length - 1);
        while (current) {
          if (matchHierarchy(current, remaining)) {
            return true;
          }
          current = current.parent;
        }
        return false;
      }
    };

    const parts = normalized.split(/\s+/).filter(Boolean);

    const traverse = (current: MockElement) => {
      if (matchHierarchy(current, parts)) {
        results.push(current);
      }
      for (const child of current.children) {
        traverse(child);
      }
    };

    for (const child of this.children) {
      traverse(child);
    }

    return results;
  }
}

export class MockDocument {
  public documentElement: MockElement;
  public head: MockElement;
  public body: MockElement;

  constructor() {
    this.documentElement = new MockElement('html');
    this.head = new MockElement('head');
    this.body = new MockElement('body');
    this.documentElement.appendChild(this.head);
    this.documentElement.appendChild(this.body);
  }

  createElement(tagName: string): MockElement {
    return new MockElement(tagName);
  }

  getElementById(id: string): MockElement | null {
    const search = (el: MockElement): MockElement | null => {
      if (el.id === id) return el;
      for (const child of el.children) {
        const res = search(child);
        if (res) return res;
      }
      return null;
    };
    return search(this.documentElement);
  }

  querySelectorAll(selector: string): MockElement[] {
    return this.documentElement.querySelectorAll(selector);
  }
}

/**
 * Creates a structural DOM tree corresponding to the verified portal shell fixture.
 */
export function createMockShellDocument(): MockDocument {
  const doc = new MockDocument();

  // 1. nav#pge_menu
  const nav = doc.createElement('nav');
  nav.setAttribute('id', 'pge_menu');
  const containerFluid = doc.createElement('div');
  containerFluid.setAttribute('class', 'container-fluid');
  const header = doc.createElement('header');

  const brand = doc.createElement('div');
  brand.setAttribute('class', 'navbar-brand');
  const logo = doc.createElement('img');
  logo.setAttribute('class', 'university-logo');
  logo.setAttribute('src', 'logo.png');
  brand.appendChild(logo);

  const actions = doc.createElement('div');
  const notif = doc.createElement('div');
  notif.setAttribute('id', 'notification-counter');
  notif.setAttribute('class', 'notification-badge');
  const logout = doc.createElement('button');
  logout.setAttribute('class', 'btn-logout');
  actions.appendChild(notif);
  actions.appendChild(logout);

  header.appendChild(brand);
  header.appendChild(actions);
  containerFluid.appendChild(header);
  nav.appendChild(containerFluid);

  doc.body.appendChild(nav);

  // 2. content-wrapper (table)
  const contentWrapper = doc.createElement('div');
  contentWrapper.setAttribute('class', 'content-wrapper');
  contentWrapper.style.display = 'table';

  // 2A. menu-left (table-cell)
  const menuLeft = doc.createElement('div');
  menuLeft.setAttribute('class', 'menu-left');
  menuLeft.style.display = 'table-cell';

  const menuList = doc.createElement('ul');
  menuList.setAttribute('id', 'studentProfilePESUHomeMenu');
  const item1 = doc.createElement('li');
  item1.setAttribute('class', 'menu-item active');
  menuList.appendChild(item1);

  menuLeft.appendChild(menuList);
  contentWrapper.appendChild(menuLeft);

  // 2B. content-right (table-cell)
  const contentRight = doc.createElement('div');
  contentRight.setAttribute('class', 'content-right');
  contentRight.style.display = 'table-cell';

  const innerWrapper = doc.createElement('div');
  innerWrapper.setAttribute('class', 'content-right-wrapper');

  const spaContent = doc.createElement('div');
  spaContent.setAttribute('id', 'StudentProfilePESUContent');
  innerWrapper.appendChild(spaContent);

  const footer = doc.createElement('footer');
  const footerContent = doc.createElement('div');
  footer.appendChild(footerContent);

  contentRight.appendChild(innerWrapper);
  contentRight.appendChild(footer);
  contentWrapper.appendChild(contentRight);

  doc.body.appendChild(contentWrapper);

  return doc;
}
