#importing resume parse function from resume_parser module

resume_parser import resumeparse

# creating function
def scan_resume(resume):
    data = resumeparse.read_file(resume)
    for i, j in data.items():
        print(f"{i}:>>{j}")

#enter file name      
scan_resume("Aditya.docx")
