cmd_Release/sandbox.node := ./gyp-mac-tool flock ./Release/linker.lock c++ -bundle -stdlib=libc++ -Wl,-search_paths_first -mmacosx-version-min=10.7 -arch x86_64 -L./Release  -o Release/sandbox.node Release/obj.target/sandbox/src/sandbox.o -undefined dynamic_lookup