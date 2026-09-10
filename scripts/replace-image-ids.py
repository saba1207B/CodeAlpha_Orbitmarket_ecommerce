from pathlib import Path

path = Path(__file__).resolve().parents[1] / "client/src/lib/store.ts"
text = path.read_text()
replacements = {
    "photo-1507473885765-e6ed057f782c": "photo-1505693416388-ac5ce85b1d9f",
    "photo-1513506003901-1e6a229e2d15": "photo-1518005020951-eccb494ad742",
    "photo-1577937927133-66ef06acdf18": "photo-1493663284031-b7e3aefcae8e",
    "photo-1553062407-98eeb64c6a62": "photo-1524758631624-e2822e304c36",
    "photo-1590874103328-eac38a683ce7": "photo-1497366754035-f200968a6e72",
    "photo-1612196808214-b8e1d6145a8c": "photo-1522708323590-d24dbb6b0267",
    "photo-1544816155-12df9643f363": "photo-1531058020387-3be344556be6",
    "photo-1517842645767-c639042777db": "photo-1519710164239-da123dc03ef4",
    "photo-1583847268964-b28dc8f51f92": "photo-1505693416388-ac5ce068fe85",
    "photo-1519710164239-da123dc03ef4": "photo-1518005020951-eccb494ad742",
    "photo-1523170335258-f5ed11844a49": "photo-1505693416388-ac5ce068fe85",
    "photo-1515562141207-7a88fb7ce338": "photo-1497366754035-f200968a6e72",
    "photo-1603006905003-be475563bc59": "photo-1522708323590-d24dbb6b0267",
    "photo-1608181831718-c9e3f4f4c2b1": "photo-1531058020387-3be344556be6",
    "photo-1555041469-a586c61ea9bc": "photo-1493663284031-b7e3aefcae8e",
    "photo-1618220179428-22790b461013": "photo-1518005020951-eccb494ad742",
    "photo-1586023492125-27b2c045efd7": "photo-1505693416388-ac5ce068fe85",
}
for old, new in replacements.items():
    text = text.replace(old, new)
path.write_text(text)
