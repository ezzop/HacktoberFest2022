package java_app;

import java.sql.*;
import javax.swing.*;

public class mysqlconnect {
    Connection con=null;
    public static Connection Connectdb(){
    
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3306/Java_DA3","root","aniket123");
            return con;
}
        catch(Exception e){
           JOptionPane.showMessageDialog(null,e);
        }
        return null;
    }
}
