// 使用 c++ 读取 src 下面的所有ts文件，并且生成一个 zip 包
// 生成的 zip 包放在 dist 目录下面

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <dirent.h>
#include <sys/stat.h>
#include <sys/types.h>
#include <unistd.h>
#include <zlib.h>

using namespace std;

class File {
public:
    File(string path) {
        this->path = path;
    }

    string getPath() {
        return this->path;
    }

    string getFileName() {
        string fileName;
        size_t pos = this->path.find_last_of('/');
        if (pos != string::npos) {
            fileName = this->path.substr(pos + 1);
        } else {
            fileName = this->path;
        }
        return fileName;
    }

    string getFileExt() {
        string fileExt;
        size_t pos = this->path.find_last_of('.');
        if (pos != string::npos) {
            fileExt = this->path.substr(pos + 1);
        }
        return fileExt;
    }

    string getFileContent() {
        ifstream ifs(this->path);
        string content((istreambuf_iterator<char>(ifs)), (istreambuf_iterator<char>()));
        return content;
    }

private:
    string path;
};

class Dir {
public:
    Dir(string path) {
        this->path = path;
    }

    string getPath() {
        return this->path;
    }

    vector<File> getFiles() {
        vector<File> files;

        DIR *dir = opendir(this->path.c_str());
        if (dir != NULL) {
            struct dirent *ent;
            while ((ent = readdir(dir)) != NULL) {
                if (ent->d_type == DT_REG) {
                    string filePath = this->path + "/" + ent->d_name;
                    files.push_back(File(filePath));
                }
            }
            closedir(dir);
        }

        return files;
    }

private:
    string path;
};

class Zip {
public:
    Zip(string path) {
        this->path = path;
    }

    string getPath() {
        return this->path;
    }

    void addFile(string fileName, string fileContent) {
        this->files.push_back(make_pair(fileName, fileContent));
    }

    void generate() {
        string zipFile = this->path + ".zip";
        gzFile gzf = gzopen(zipFile.c_str(), "wb");
        if (gzf == NULL) {
            cout << "open file error" << endl;
            return;
        }

        for (int i = 0; i < this->files.size(); i++) {
            string fileName = this->files[i].first;
            string fileContent = this->files[i].second;
            gzwrite(gzf, fileContent.c_str(), fileContent.length());
        }

        gzclose(gzf);
    }

private:
    string path;
    vector<pair<string, string>> files;
};


int main() {
    Dir dir("src");
    vector<File> files = dir.getFiles();

    Zip zip("dist/a");
    for (int i = 0; i < files.size(); i++) {
        File file = files[i];
        string fileName = file.getFileName();
        string fileContent = file.getFileContent();
        zip.addFile(fileName, fileContent);
    }
    zip.generate();

    return 0;
}
