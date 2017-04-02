build :
	mkdir -p app/srv
	cp -r ../../*.js app
	cp -r ../../srv/*.js app/srv
	docker build -t nodezoo-validate:1 .
	docker build -t nodezoo-validate-prod:1 -f Dockerfile-prod .

clean :
	rm *~

.PHONY : build clean
