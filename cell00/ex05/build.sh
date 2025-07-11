if [ "$#" -eq 0 ]; then
	echo "No arguments supplied"
	exit 1
fi

for name in "$@"; do
	folder="$PWD/ex${name}"
	mkdir "ex${name}"
	echo "$folder"
done
