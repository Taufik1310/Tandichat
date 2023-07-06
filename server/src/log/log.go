package log

import (
	"fmt"
	"log"
)

var logger *log.Logger

func Init() {
	logger = log.Default()

}

func Info(value ...any) {

	logger.Println("INFO : ", fmt.Sprintln(value...))
}

func Warning(value ...any) {
	logger.Println("WARNING : ", fmt.Sprintln(value...))
}

func Fatal(value ...any) {
	logger.Println("FATAL : ", fmt.Sprintln(value...))
}
