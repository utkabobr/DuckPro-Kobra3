#!/bin/bash
echo "1. Creating setup.tar.gz, please wait..."
cd files
tar -czvf setup.tar.gz --exclude='setup.tar.gz' .
cd ..
mv files/setup.tar.gz ./

echo "2. Packing update.swu archive..."
rm -f update_swu/setup.tar.gz
mv setup.tar.gz update_swu
zip -P U2FsdGVkX19deTfqpXHZnB5GeyQ/dtlbHjkUnwgCi+w= -r update.swu update_swu

echo "3. Creating final update package..."
rm -f aGVscF9zb3Nf/update.swu
mv update.swu aGVscF9zb3Nf
zip -r DuckPro.zip aGVscF9zb3Nf IMPORTANT.txt

