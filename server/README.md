# Tandichat Server Side

## Cara Menjalankan Server
Pastikan golang sudah di instal di sistem

Jika berada di sistem operasi windows. untuk menjalankan files .sh bisa menggunakan git bash

hapus nama ".example" dari .env lalu isi setiap barisnya

`SECRET_KEY` di isi bebas asalkan rahasia, digunakan untuk "menadatangani" JWT untuk validasi
`DB_URL` di isi tergantung dengan database. jika menggunakan dockerfile di folder ini, maka gunakan
```
DB_URL="host=localhost user=root password=root dbname=tandichat port=5432 sslmode=disable TimeZone=Asia/Shanghai"
```

Install Docker lalu jalankan 
```bash
$ ./run.sh -docker-build
```
untuk membuild docker image, menjalankan container dan menjalankan aplikasi go sekaligus

jika container telah dibuat. jalankan
```bash
$ ./run.sh -docker-run
```
untuk menjalankan container dan aplikasi saja tanpa membuild docker image

jika container sudah berjalan. jalankan
```bash
$ ./run.sh
```
untuk menjalankan aplikasi golangnya saja
