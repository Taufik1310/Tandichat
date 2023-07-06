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

Jika Kamu karena suatu alasan tidak bisa menggunakan docker, kamu bisa menggunakan mysql.

`DB_URL` isi dengan
```
DB_URL=user:pass@tcp(127.0.0.1:3306)/namadatabase?charset=utf8mb4&parseTime=True&loc=Local
```

lalu saat menjalankan server, berikan argument mysql

```bash
go run src/main.go --db mysql
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

atau jika ingin langusung menggunakan golang

```bash
go run src/main.go
```


# Some Notes

## Authentication Method

Untuk sekarang. authentikasi per request menggunakan JWT yang di simpan di header via authorization header. Cara yang lebih baik adalah dengan menggunakan cookie (httpOnly) 

https://security.stackexchange.com/questions/130548/should-jwt-token-be-stored-in-a-cookie-header-or-body

lebih baik lagi jika menggunakan refresh token untuk tetap menjaga user tetap login

## Websocket Authentication

Untuk sekarang authentikasi websocket dengan mengirimkan credentials melewati URI, yang mana ini adalah cara yang paling tidak secure https://websockets.readthedocs.io/en/stable/topics/authentication.html. walaupun credential hanya dapat digunakan 1x dan hanya berisi UUID dan UserID.

Dari tulisan diatas. cara yang terbaik adalah dengan mengirimkan credentials langusng melewati webscoket. jika pesan pertama adalah credentials yang tidak valid, server langsung memutus hubungan dengan client

## Email Verification

Email Verification berekerja dengan baik menggunakan mailtrap test. tetapi untuk kasus di dunia nyata menggunakan email yang sebenarnya, Belum kami coba