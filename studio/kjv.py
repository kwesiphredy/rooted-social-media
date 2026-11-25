import sys, pythonbible as bible
def kjv(ref):
    ids = bible.convert_references_to_verse_ids(bible.get_references(ref))
    return ' '.join(bible.get_verse_text(i, version=bible.Version.KING_JAMES) for i in ids)
if __name__ == '__main__':
    for r in sys.argv[1:]: print(r, '|', kjv(r))
