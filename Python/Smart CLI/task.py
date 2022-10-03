import sys
from datetime import datetime


args = sys.argv
tasks = []              #list to store tasks to be done
done = []               #list to store tasks that are completed
HELP_MESSAGE="""/
Usage :-
$ ./task add 2 hello world     # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                    # Show incomplete priority list items sorted by priority in ascending order
$ ./task del NUMBER   # Delete the incomplete item with the given priority number
$ ./task done NUMBER  # Mark the incomplete item with the given PRIORITY_NUMBER as complete
$ ./task help                  # Show usage
$ ./task report                # Statistics"""

TODO_FILE = "todo.txt"
DONE_FILE = "done.txt"
now = datetime.now()

def add(task):
    # Add task to todo.txt file

    if(task == ""):
        print("Error: Missing todo string. Nothing added!")
        return

    with open(TODO_FILE, 'a') as fd:
        fd.write(task)
        fd.write("\n")
    print(f'Added todo: "{task}"')

def ls(_):
    NO_PENDING_TASKS_MESSAGE = "There are no pending todos!"
    try:
        with open(TODO_FILE) as fd:
            todo_list = fd.readlines() #reads the todo.txt file and saves the tasks in a list

            list_size = len(todo_list)

            if(list_size==0):
                print(NO_PENDING_TASKS_MESSAGE)

            for index, todo_list in enumerate(reversed(todo_list)):
                print(f"[{list_size - index}] {todo_list.strip()}")
    except FileNotFoundError:
        print(NO_PENDING_TASKS_MESSAGE)

def delete(task):
    task = int(task)
    with open(TODO_FILE) as fd:
        todo_list = fd.readlines()
        if len(todo_list) < task:
          print(f"Error: todo #{task} does not exist.") 
          return
        task = task-1
    with open(TODO_FILE, 'w') as fd:
        for pos, todo_list in enumerate(todo_list): 
          if pos != task:
            fd.write(todo_list)
    print(f"Deleted todo #{task+1}")

def done(task):
   with open(TODO_FILE) as fd:
        todo_list = fd.readlines()
        task = int(task)
        if len(todo_list) < task:
          print(f"Error: todo #{task} does not exist.")
          return
        
        task = task-1
   with open(DONE_FILE, 'a') as fd:
        fd.write("x ")
        fd.write(now.strftime("%Y/%m/%d "))
        fd.write(todo_list[task])
        fd.write("\n")
   with open(TODO_FILE, 'w') as fd:
        for pos, todo_list in enumerate(todo_list): 
          if pos != task:
            fd.write(todo_list)

   print(f"Marked todo #{task+1} as done")

def report(_):
    with open(TODO_FILE, 'r') as fd:
        todo_list = fd.readlines()

        todo_size = len(todo_list)
    with open (DONE_FILE, 'r') as fd:
        done_list = fd.readlines()

        done_size = len(done_list)
    print(f"{now.strftime('%Y/%m/%d')} Pending: {todo_size} Completed: {done_size}")

def help(_):
    print(HELP_MESSAGE)

def  controller(command, task):
    operator = {
        "help": help,
        "add" : add,
        "ls" : ls,
        "del": delete,
        "done":done,
        "report" : report,
    }. get(command, help) 
    return operator(task)
def main():
    if len(sys.argv)<2:
        sys.exit(HELP_MESSAGE)

    _,command,*task = sys.argv
    task = " ".join(task)

    controller(command, task)

if __name__ == "__main__":
    main()




# try:
#         command = args[1]  
# except IndexError:
#         sys.stdout.buffer.write(string_variable.encode('utf8'))
#         # sys.stdout.buffer.write(string_variable.encode('utf8'))
#         # sys.stdout.buffer.write(''.encode('utf8'))
#         # sys.stdout.buffer.write("".encode('utf8'))
#         # sys.stdout.buffer.write("".encode('utf8'))
#         # sys.stdout.buffer.write("".encode('utf8'))
#         # sys.stdout.buffer.write("".encode('utf8'))
#         # sys.stdout.buffer.write("".encode('utf8'))


#         # print("Usage :-".encode(encoding = 'UTF-8', errors = 'strict'))
#         # print('$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list'.encode(encoding = 'UTF-8', errors = 'strict'))
#         # print("$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order".encode(encoding = 'UTF-8', errors = 'strict'))
#         # print("$ ./task del NUMBER            # Delete the incomplete item with the given index".encode(encoding = 'UTF-8', errors = 'strict'))
#         # print("$ ./task done NUMBER           # Mark the incomplete item with the given index as complete".encode(encoding = 'UTF-8', errors = 'strict'))
#         # print("$ ./task help                 # Show usage".encode(encoding = 'UTF-8', errors = 'strict'))
#         # print("$ ./task report               # Statistics".encode(encoding = 'UTF-8', errors = 'strict'))
#         sys.exit(1)



# if command not in ("add","del","ls","done","help","report"):
#         sys.stdout.buffer.write(string_variable.encode('utf8'))
#         sys.exit(1)

# if command == "help":
#         sys.stdout.buffer.write(string_variable.encode('utf8'))
#         sys.exit(1)



# import argparse
# import sys
# import os


# def checker(args):
#     if args.help =="help":
#         return ('Usage :-\n$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order\n$ ./task del NUMBER            # Delete the incomplete item with the given index\n$ ./task done NUMBER           # Mark the incomplete item with the given index as complete\n$ ./task help                 # Show usage\n$ ./task report               # Statistics ')
#     else:
#         return ('Invalid')

# if __name__ == "__main__":
#     parser = argparse.ArgumentParser()


#     Executing the command without any arguments, or with a single argument help prints the CLI usage.

# ```
# $ ./task help
# Usage :-
# $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
# $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
# $ ./task del INDEX            # Delete the incomplete item with the given index
# $ ./task done INDEX           # Mark the incomplete item with the given index as complete
# $ ./task help                 # Show usage
# $ ./task report               # Statistics
# ```
    # perform the above task
    # ./task help

    # parser.add_argument('help', type=str, default="help", help='This is the helper function')
    # parser.add_argument('--x', type=float, default=1.0, help='Enter First Number. This is a utility for calculation')

    # parser.add_argument('--y', type=float, default=3.0, help='Enter the Second Number. This is a utility for calculation')

    # parser.add_argument('--o', type=str, default="add", help='Enter the Third Number. This is a utility for calculation')

    # args = parser.parse_args()
    # sys.stdout.write(str(checker(args)))
    # if not os.path.isfile(args.file):
    #     print('Файл не найден')
    #     sys.exit(1)
    # with open(args.file, 'r', encoding='utf-8') as f:
    #     text = f.read()
    # words = text.split()
    # print(f'Количество слов в тексте: {len(words)}')
#print("Hello, World!")
