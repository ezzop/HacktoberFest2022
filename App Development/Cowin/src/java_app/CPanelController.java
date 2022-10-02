package java_app;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import javax.swing.JOptionPane;

public class CPanelController {

    @FXML
    private TextField txt_name;

    @FXML
    private TextField txt_phone;

    @FXML
    private TextArea txt_address;

    @FXML
    private Button btn_submit_details;
    
    Connection con = null;
    ResultSet rs =null;
    PreparedStatement ps=null;
    public String x,y;
    
     @FXML
    private void Details(ActionEvent event) throws Exception{
        con=mysqlconnect.Connectdb();
        try {
            ps = con.prepareStatement("UPDATE login SET name = ?, address=?, phone=? where email=? and pass=?");
            ps.setString(1, txt_name.getText());
            ps.setString(2,txt_address.getText());
            ps.setString(3,txt_phone.getText());
            ps.setString(4, x);
            ps.setString(5, y);
            
            int i = ps.executeUpdate();
            if (i > 0) {
                JOptionPane.showMessageDialog(null, "Details updated");
                btn_submit_details.getScene().getWindow().hide();
                FXMLLoader loader=new FXMLLoader(getClass().getResource("Homepage.fxml"));
                Parent root = loader.load();
                HomepageController homepagecontroller = loader.getController();
                homepagecontroller.transferMessage(x);
                Stage mainstage=new Stage();
                Scene scene=new Scene(root);
                mainstage.setScene(scene);
                mainstage.show();
            }
            else{
                JOptionPane.showMessageDialog(null, "Invalid Details");
            }

        } catch (Exception ex) {
            JOptionPane.showMessageDialog(null, ex);
        }
    }

   public void transferMessage(String m1,String m2) {
        //Display the message
        x=m1;
        y=m2;
    }

}
