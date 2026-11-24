for file in *.json; do
  [[ "$file" == *-sidebar.json ]] && continue

  new_file="${file%.json}-sidebar.json"

  sed 's/"location": "top"/"location": "sidebar"/g' "$file" > "$new_file"
done
