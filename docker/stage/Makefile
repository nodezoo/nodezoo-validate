build :
	mkdir -p app/srv
	cp -r ../../*.js app
	cp -r ../../srv/*.js app/srv
	docker build -t nodezoo-validate .

clean :
	rm *~

.PHONY : build clean
