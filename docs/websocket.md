// TODO : Perbaiki dokumentasi

== Event ==

Event: message

Description: Event ini di jalankan setelah ada message dari client

Payload: {
reciever : (string) - Id penerima
message: (string) - pesan yang dikirim
token: (string) - JWT untuk authentikasi
}

Event: friendRequest

Description: Event ini dijalankan saat client mengirimkan permintaan pertemanan

Payload: {
reciever: (string) - Id penerima
token: (string) - JWT untuk authentikasi
}

Event: friendAccept

Description: Event ini dijalankan saat client menerima permintaan pertemanan
Payload: {
reciever: (string) - Id penerima
token: (string) - JWT untuk authentikasi
}
