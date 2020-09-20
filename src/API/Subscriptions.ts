
class Subscriptions<T> {
  subs = new Set<T>();

  add = (fn: T) => { 
    this.subs.add(fn);
    return fn; 
  }

  remove = (fn: T) => { 
    this.subs.delete(fn); 
  }

  forEach = this.subs.forEach.bind(this.subs);

}

export default Subscriptions;