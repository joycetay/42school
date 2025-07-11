if [ "$#" -eq 0 ]; then
	echo "No arguments supplied"
	exit 1
fi

count=0
for arg in "$@"; do
	echo "$arg"
	count=$((count+1))
	[ "$count" -ge 3 ] && break
done
