package java_app;

import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ResourceBundle;
import javafx.event.ActionEvent;
import javafx.fxml.Initializable;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import javax.swing.JOptionPane;

public class HomepageController  implements Initializable {
    @FXML
    private Button btn_logout;
    @FXML
    private Button btn_register;
    @FXML
    private Button btn_vaccinated;
    Connection con = null;
    ResultSet rs =null;
    PreparedStatement ps=null;
    public String x;
    
    @FXML
    private void Logout(ActionEvent event) throws Exception{
        try {
                JOptionPane.showMessageDialog(null, "Logout Successful");
                btn_logout.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("FXML.fxml"));
                Parent root = loader.load();
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }
    
    @FXML
    private void RegisterV(ActionEvent event) throws Exception{
        try {
                JOptionPane.showMessageDialog(null, "Register Fast!!...Slots Are Available now");
                btn_register.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("Registerv.fxml"));
                Parent root = loader.load();
                RegistervController registervcontroller = loader.getController();
                registervcontroller.transferMessage(x);                
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

@FXML
    private void VaccineV(ActionEvent event) throws Exception{
        try {
                JOptionPane.showMessageDialog(null, "You surely are an responsible citizen");
                btn_vaccinated.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("Vaccinatedv.fxml"));
                Parent root = loader.load();
                VaccinatedvController vaccinatedvcontroller = loader.getController();
                vaccinatedvcontroller.transferMessage(x);                
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            
       } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }
    
    
    
    
    
    @Override
    public void initialize(URL url, ResourceBundle rb) {
        // TODO
    }    

    void transferMessage(String x) {
        this.x=x;
    }

}
