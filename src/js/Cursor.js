/**
 * @type {import('@/js/spotify').Cursor}
 */
class Cursor {
  constructor(fromApi) {
    this.href = fromApi?.href;
    this.limit = fromApi?.limit;
    this.offset = fromApi?.offset;
    this.total = fromApi?.total;
    this.next = fromApi?.next;
    this.previous = fromApi?.previous;
  }
}

export default Cursor;
