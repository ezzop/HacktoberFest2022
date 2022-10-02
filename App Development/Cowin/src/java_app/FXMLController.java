package java_app;

import java.net.URL;
import java.sql.*;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;
import javax.swing.JOptionPane;

/**
 * FXML Controller class
 *
 * @author anik
 */
public class FXMLController implements Initializable {

     @FXML
    private AnchorPane pane_login;
    @FXML
    private PasswordField txt_password;
    @FXML
    private TextField txt_email;
    @FXML
    private ComboBox type;
    @FXML
    private Button btn_login;
    @FXML
    private AnchorPane pane_signup;
    @FXML
    private PasswordField txt_password_up;
    @FXML
    private TextField txt_email_up;
    @FXML
    private Button btn_signup;
    
    Connection con = null;
    ResultSet rs =null;
    PreparedStatement ps=null;
    public String x,y,z;
    
    public void LoginPaneShow(){
        pane_login.setVisible(true);
        pane_signup.setVisible(false);
    }
    
     public void SignupPaneShow(){
         pane_signup.setVisible(true);
        pane_login.setVisible(false);
    }

     @FXML
     private void Login(ActionEvent event) throws Exception{
         con=mysqlconnect.Connectdb();
         boolean st =false;
         try{
             ps = con.prepareStatement("select * from login where email=? and pass=? and type=?");
             ps.setString(1, txt_email.getText());
             ps.setString(2, txt_password.getText());
             ps.setString(3, type.getValue().toString());
             x=txt_email.getText();
             z=type.getValue().toString();
             rs =ps.executeQuery();
            st = rs.next();
            if(st && z.equals("User")){
                JOptionPane.showMessageDialog(null, "Login Successful");
                btn_login.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("Homepage.fxml"));
                Parent root = loader.load();
                HomepageController homepagecontroller = loader.getController();
                homepagecontroller.transferMessage(x);
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            }
            else if(st && z.equals("Admin")){
                JOptionPane.showMessageDialog(null, "Login Successful");
                btn_login.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("adminpage.fxml"));
                Parent root = loader.load();
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            }
            else
                JOptionPane.showMessageDialog(null, "Invalid credentials");
         }
         catch(Exception e){
             JOptionPane.showMessageDialog(null, e);
         }
     }
     
     @FXML
    private void Register(ActionEvent event) throws Exception{
        con=mysqlconnect.Connectdb();
        try {
            ps = con.prepareStatement("insert into login (email,pass) values(?,?)");
            x=txt_email_up.getText();
            y=txt_password_up.getText();
            ps.setString(1, txt_email_up.getText());
            ps.setString(2,txt_password_up.getText());
            int i = ps.executeUpdate();
            if (i > 0) {
                JOptionPane.showMessageDialog(null, "Sign up Successful");
                btn_signup.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("CPanel.fxml"));
                Parent root = loader.load();
                CPanelController cpanelcontroller = loader.getController();
                cpanelcontroller.transferMessage(x,y);
                
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            }
            else{
                JOptionPane.showMessageDialog(null, "User already exists");
            }

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }
    
    
     
     
    @Override
    public void initialize(URL url, ResourceBundle rb) {
      type.getItems().addAll("Admin","User");
    }    
    
}
