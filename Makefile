run-default:
	cd exampleSite && hugo server -D --gc -p 13131 --config config.default.yml

run-profile-mode:
	cd exampleSite && hugo server -D --gc -p 13131 --config config.profileMode.yml

chroma-css:
	hugo gen chromastyles --style=dracula > assets/css/lib/chroma-dark.css
	hugo gen chromastyles --style=github > assets/css/lib/chroma-light.css
